export default async function handler(req, res) {
  console.log('[API/CREATE] Request Received:', { 
    method: req.method, 
    body: req.body 
  });
  
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { amount, externalId, taxId, name, email } = req.body;
  const apiKey = process.env.ABACATEPAY_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'API Key not configured' });
  }

  try {
    const apiResponse = await fetch('https://api.abacatepay.com/v2/transparents/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        method: 'PIX',
        data: {
          amount: amount || 1490, // Valor em centavos
          externalId: externalId,
          customer: {
            name: name || "Profissional Reformaê",
            email: email || "contato@reformae.com.br",
            taxId: taxId || "00000000000"
          }
        }
      })
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      console.error('AbacatePay v2 Error:', data);
      throw new Error(data.message || 'Erro ao gerar PIX na v2');
    }

    // A v2 devolve o objeto dentro de data
    res.status(200).json(data.data || data);
  } catch (error) {
    console.error('Server Side Error:', error.message);
    res.status(500).json({ message: error.message });
  }
}
