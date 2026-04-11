export default async function handler(req, res) {
  const { id } = req.query;
  const apiKey = process.env.ABACATEPAY_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'API Key not configured' });
  }

  try {
    const response = await fetch(`https://api.abacatepay.com/v2/transparents/check?id=${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('AbacatePay Status Error:', data);
      throw new Error(data.message || 'Error checking status');
    }

    // Na v2 o status vem direto no objeto data
    const status = data.data?.status || data.status;
    res.status(200).json({ status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
