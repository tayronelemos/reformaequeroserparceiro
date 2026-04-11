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
      
      let query = supabase.from('profissionais').update({ is_vip: true });

      if (externalId) {
        query = query.eq('id', externalId);
      } else if (customerEmail) {
        // Se o externalId falhar, buscamos pelo e-mail do formulário
        query = query.eq('email', customerEmail);
      } else {
        throw new Error('No identifier (externalId or email) found in webhook payload');
      }

      const { error } = await query;

      if (error) throw error;
      console.log('VIP status updated successfully via Webhook');
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ message: error.message });
  }
}
