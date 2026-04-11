export default async function handler(req, res) {
  const { id } = req.body;
  const apiKey = process.env.ABACATEPAY_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'API Key not configured' });
  }

  try {
    // Conforme print: POST /v2/transparents/simulate
    // Tentamos passar o ID na query e no body para garantir
    const response = await fetch(`https://api.abacatepay.com/v2/transparents/simulate?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        id: id,
        metadata: {}
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Simulation Error Details:', data);
      throw new Error(data.message || 'Erro ao simular pagamento');
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
