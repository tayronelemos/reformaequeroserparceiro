import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { code } = req.query;

  if (!code || code.trim() === '') {
    return res.status(400).json({ valid: false, message: 'Código de cupom não informado.' });
  }

  try {
    const { data: coupon, error } = await supabase
      .from('partner_coupons')
      .select(`
        id,
        code,
        discount_type,
        discount_value,
        max_uses,
        uses_count,
        is_active,
        expires_at,
        partner_id,
        partners (
          id,
          name,
          is_active
        )
      `)
      .eq('code', code.trim().toUpperCase())
      .single();

    if (error || !coupon) {
      return res.status(200).json({ valid: false, message: 'Cupom não encontrado.' });
    }

    if (!coupon.is_active) {
      return res.status(200).json({ valid: false, message: 'Este cupom está inativo.' });
    }

    if (!coupon.partners?.is_active) {
      return res.status(200).json({ valid: false, message: 'Parceiro deste cupom está inativo.' });
    }

    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return res.status(200).json({ valid: false, message: 'Este cupom expirou.' });
    }

    if (coupon.max_uses !== null && coupon.uses_count >= coupon.max_uses) {
      return res.status(200).json({ valid: false, message: 'Este cupom atingiu o limite de usos.' });
    }

    return res.status(200).json({
      valid: true,
      coupon_id: coupon.id,
      partner_id: coupon.partners?.id,
      partner_name: coupon.partners?.name,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      message: `Cupom aplicado! Parceiro: ${coupon.partners?.name}`
    });

  } catch (err) {
    console.error('Validate coupon error:', err);
    return res.status(500).json({ valid: false, message: 'Erro ao validar cupom.' });
  }
}
