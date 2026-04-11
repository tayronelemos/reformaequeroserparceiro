
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (Backend version using Service Role if needed, but here Anon works if RLS allows)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  // 1. Basic Security Check (Optional but recommended)
  // const signature = req.headers['abacatepay-signature'];
  // if (process.env.ABACATEPAY_WEBHOOK_SECRET && signature !== process.env.ABACATEPAY_WEBHOOK_SECRET) {
  //   return res.status(401).json({ message: 'Invalid signature' });
  // }

  const event = req.body;

  try {
    // 2. Identify the Event from v2
    const eventType = event.event; // 'transparent.completed' or 'checkout.completed'
    const billing = event.data;
    
    // In AbacatePay v2, successful payment events end with '.completed'
    const isSuccess = eventType === 'transparent.completed' || eventType === 'checkout.completed' || billing.status === 'PAID';
    const leadId = billing.externalId;

    if (isSuccess && leadId) {
      console.log(`[WEBHOOK] Payment confirmed for Lead: ${leadId} via ${eventType}`);
      
      // Update Supabase to VIP
      const { error } = await supabase
        .from('profissionais')
        .update({ 
           is_vip: true, 
           vip_until: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString() 
        })
        .eq('id', leadId);

      if (error) throw error;
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    res.status(500).json({ message: error.message });
  }
}
