import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || "",
  process.env.VITE_SUPABASE_ANON_KEY || ""
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const event = req.body;

  try {
    const eventType = event.event;
    const billing = event.data;
    
    const isSuccess = eventType === 'transparent.completed' || eventType === 'checkout.completed' || billing?.status === 'PAID';
    const leadId = billing?.externalId;

    if (isSuccess && leadId) {
      console.log(`[WEBHOOK] Payment confirmed for Lead: ${leadId}`);
      
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
  } catch (error) {
    console.error('Webhook Error:', error.message);
    res.status(500).json({ message: error.message });
  }
}
