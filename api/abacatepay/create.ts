

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { amount, customerId, externalId } = req.body;
  const apiKey = process.env.ABACATEPAY_API_KEY;

  if (!apiKey || apiKey === 'INSIRA_SUA_CHAVE_AQUI') {
    return res.status(500).json({ message: 'API Key not configured' });
  }

  try {
    const apiResponse = await fetch('https://api.abacatepay.com/v1/billing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        frequency: 'ONE_TIME',
        methods: ['PIX'],
        products: [
          {
            externalId: 'vip_list',
            name: 'Lista VIP Reformaê',
            quantity: 1,
            unitPrice: amount
          }
        ],
        returnUrl: 'https://queroserparceiroreformae.vercel.app/',
        completionUrl: 'https://queroserparceiroreformae.vercel.app/',
        customer: {
            "name": "Profissional Reformaê",
            "email": "contato@reformae.com.br",
            "cellphone": "99999999999",
            "taxId": "00000000000"
        },
        externalId: externalId
      })
    });

    const contentType = apiResponse.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await apiResponse.json();
    } else {
      const text = await apiResponse.text();
      console.error('Non-JSON response from AbacatePay:', text);
      throw new Error(`Erro na API (Resposta não-JSON). Verifique os logs da Vercel.`);
    }

    if (!apiResponse.ok) {
      console.error('AbacatePay API Error Details:', data);
      throw new Error(data.error || data.message || `Erro ${apiResponse.status} no AbacatePay`);
    }

    res.status(200).json(data.data || data);
  } catch (error: any) {
    console.error('Server Side Error:', error.message);
    res.status(500).json({ message: error.message });
  }
}
