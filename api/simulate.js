export default async function handler(req, res) {
  const { id } = req.body;
  const apiKey = process.env.ABACATEPAY_API_KEY;

  console.log("ID recebido:", id);

  if (!id) {
    return res.status(400).json({ message: 'Não é possível simular: ID do PIX não fornecido.' });
  }

  if (!apiKey) {
    return res.status(500).json({ message: 'API Key não configurada no servidor.' });
  }

  try {
    console.log("Chamando simulate-payment...");
    
    const response = await fetch(`https://api.abacatepay.com/v2/transparents/simulate-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        id: id
      })
    });

    const result = await response.json();
    console.log("Resposta AbacatePay:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Erro do AbacatePay na simulação');
    }

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Erro na rota de simulação:', error.message);
    res.status(500).json({ message: error.message });
  }
}
