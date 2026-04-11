

export default async function handler(req: any, res: any) {
  const { id } = req.query;
  const apiKey = process.env.ABACATEPAY_API_KEY;

  if (!apiKey || apiKey === 'INSIRA_SUA_CHAVE_AQUI') {
    return res.status(500).json({ message: 'API Key not configured' });
  }

  try {
    const response = await fetch(`https://api.abacatepay.com/v1/billing/list?id=${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error checking status');
    }

    // AbacatePay v2 usually returns an array or object in data.data
    const status = data.data?.[0]?.status || data.data?.status;
    res.status(200).json({ status });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
