export default async function handler(req, res) {
  console.log('[API/CREATE] Request Received:', { 
    method: req.method, 
    body: req.body 
  });
  
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { amount, externalId, taxId, name, email, cellphone } = req.body;
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
          amount: amount || 500, // Valor em centavos (Teste R$ 5,00)
          externalId: externalId,
          customer: {
            name: name || "Profissional Reformaê",
            email: email || "contato@reformae.com.br",
            taxId: taxId || "00000000000",
            cellphone: cellphone || "00000000000"
          }
        }
      })
    });

    const data = await apiResponse.json();
    
    // AUDITORIA: Log completo da resposta do AbacatePay
    console.log('--- AUDITORIA ABACATEPAY v2 ---');
    console.log('Payload Bruto:', JSON.stringify(data, null, 2));
    
    const resultData = data.data || data;
    
    if (resultData.brCode) {
      console.log('Comprimento brCode:', resultData.brCode.length);
      console.log('Status do PIX:', resultData.status);
      console.log('Expira em:', resultData.expiresAt);
    }

    if (!apiResponse.ok) {
      console.error('Erro na API AbacatePay:', data);
      const errorMessage = data.error || data.message || 'Erro desconhecido';
      throw new Error(`${errorMessage}`);
    }

    res.status(200).json(resultData);
  } catch (error) {
    console.error('Server Side Error:', error.message);
    res.status(500).json({ message: error.message });
  }
}
