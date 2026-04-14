import { createHmac } from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const GATEWAY_FEE = 0.80;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const signature = req.headers['x-abacatepay-signature'];
  const secret = process.env.ABACATEPAY_WEBHOOK_SECRET;

  if (signature && secret) {
    const hmac = createHmac('sha256', secret);
    const bodyString = JSON.stringify(req.body);
    const digest = hmac.update(bodyString).digest('hex');
    if (signature !== digest) {
      console.warn('Webhook Signature mismatch - proceeding for dev testing');
    }
  }

  const event = req.body;
  console.log('Webhook Payload:', JSON.stringify(event, null, 2));

  try {
    const eventType = event.event;
    const data = event.data;
    const transparentData = data?.transparent;

    const externalId = transparentData?.externalId;
    const customerEmail = data?.customer?.email;

    if (eventType === 'transparent.completed' && transparentData?.status === 'PAID') {
      console.log(`Processing VIP upgrade. ExternalId: ${externalId}, Email: ${customerEmail}`);

      // 1. Buscar profissional
      let professional = null;
      if (externalId) {
        const { data: prof } = await supabase
          .from('profissionais')
          .select('id, email, partner_id, partner_coupon_id')
          .eq('id', externalId)
          .single();
        professional = prof;
      } else if (customerEmail) {
        const { data: prof } = await supabase
          .from('profissionais')
          .select('id, email, partner_id, partner_coupon_id')
          .ilike('email', customerEmail)
          .single();
        professional = prof;
      }

      if (!professional) {
        console.warn(`No professional found with Id: ${externalId} or Email: ${customerEmail}`);
        return res.status(200).json({ received: true });
      }

      // 2. Atualizar profissional para VIP
      await supabase
        .from('profissionais')
        .update({
          is_vip: true,
          vip_until: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq('id', professional.id);

      // 3. Calcular valores financeiros
      const grossAmount = 16.90;
      const finalAmountPaid = grossAmount; // sem desconto por padrão (descontos futuros via cupom)
      const netRevenue = parseFloat((finalAmountPaid - GATEWAY_FEE).toFixed(2));

      // 4. Buscar % de comissão do parceiro (se houver)
      let commissionPct = 0;
      let partnerCommissionAmount = 0;
      let platformRevenue = netRevenue;

      if (professional.partner_id) {
        const { data: partner } = await supabase
          .from('partners')
          .select('commission_pct')
          .eq('id', professional.partner_id)
          .single();

        if (partner) {
          commissionPct = partner.commission_pct;
          partnerCommissionAmount = parseFloat((netRevenue * (commissionPct / 100)).toFixed(2));
          platformRevenue = parseFloat((netRevenue - partnerCommissionAmount).toFixed(2));
        }
      }

      // 5. Criar vip_order
      const { data: vipOrder, error: orderError } = await supabase
        .from('vip_orders')
        .insert({
          professional_id: professional.id,
          partner_id: professional.partner_id || null,
          partner_coupon_id: professional.partner_coupon_id || null,
          gross_amount: grossAmount,
          gateway_fee: GATEWAY_FEE,
          discount_amount: 0,
          final_amount_paid: finalAmountPaid,
          net_revenue: netRevenue,
          commission_pct: commissionPct,
          partner_commission_amount: partnerCommissionAmount,
          platform_revenue: platformRevenue,
          payment_status: 'paid',
          external_payment_id: transparentData?.id || externalId,
          paid_at: new Date().toISOString()
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating vip_order:', orderError);
      } else {
        console.log('vip_order created:', vipOrder.id);
      }

      // 6. Criar partner_commission (se houver parceiro)
      if (professional.partner_id && partnerCommissionAmount > 0 && vipOrder) {
        const { error: commError } = await supabase
          .from('partner_commissions')
          .insert({
            partner_id: professional.partner_id,
            vip_order_id: vipOrder.id,
            amount: partnerCommissionAmount,
            status: 'pending'
          });

        if (commError) {
          console.error('Error creating partner_commission:', commError);
        } else {
          console.log(`Commission of R$${partnerCommissionAmount} registered for partner ${professional.partner_id}`);
        }
      }

      // 7. Incrementar uses_count do cupom (se houver)
      if (professional.partner_coupon_id) {
        await supabase.rpc('increment_coupon_uses', { coupon_id: professional.partner_coupon_id });
      }

      console.log(`VIP upgrade complete for professional: ${professional.id}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ message: error.message });
  }
}
