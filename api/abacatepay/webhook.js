import { createHmac } from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const signature = req.headers['x-abacatepay-signature'];
  const secret = process.env.ABACATEPAY_WEBHOOK_SECRET;

  // Validação de segurança facultativa (mas recomendada)
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
    
    // Pegamos o ID Externo ou o E-mail do cliente como fallback
    const externalId = transparentData?.externalId;
    const customerEmail = data?.customer?.email;

    if (eventType === 'transparent.completed' && transparentData?.status === 'PAID') {
      console.log(`Processing VIP upgrade. ExternalId: ${externalId}, Email: ${customerEmail}`);
      
      let query = supabase.from('profissionais').update({ 
        is_vip: true,
        vip_until: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString() // 60 days
      });

      if (externalId) {
        query = query.eq('id', externalId);
      } else if (customerEmail) {
        // Buscamos pelo e-mail ignorando case
        query = query.ilike('email', customerEmail);
      } else {
        throw new Error('No identifier (externalId or email) found in webhook payload');
      }

      const { data: updateData, error } = await query.select();

      if (error) throw error;
      
      if (!updateData || updateData.length === 0) {
        console.warn(`No professional found with Id: ${externalId} or Email: ${customerEmail}`);
      } else {
        console.log('VIP status updated successfully via Webhook for:', updateData[0].email);
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ message: error.message });
  }
}
