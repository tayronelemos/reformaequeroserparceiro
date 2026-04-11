import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { amount, customerId, externalId } = req.body;
  const apiKey = process.env.ABACATEPAY_API_KEY;

  if (!apiKey || apiKey === 'INSIRA_SUA_CHAVE_AQUI') {
    return res.status(500).json({ message: 'API Key not configured' });
  }

  try {
    const response = await fetch('https://api.abacatepay.com/v1/billing/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        frequency: 'ONE_TIME',
        methods: ['PIX'],
        products: [
          {
            externalId: 'vip_list',
            name: 'Lista VIP Reformaê',
            quantity: 1,
            unitPrice: amount // 1490 cents
          }
        ],
        returnUrl: 'https://queroserparceiroreformae.vercel.app/admin',
        completionUrl: 'https://queroserparceiroreformae.vercel.app/admin',
        externalId: externalId // The Supabase Professional ID
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('AbacatePay Error:', data);
      throw new Error(data.message || 'Error creating billing');
    }

    // Return the checkout URL or the PIX data if transparent
    // AbacatePay v2 returns a checkout url, but we want the PIX data for transparent.
    // Usually v2 has a "billing" object with "pix" attachment.
    res.status(200).json(data.data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
