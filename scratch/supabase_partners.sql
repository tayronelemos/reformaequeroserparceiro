-- ==============================================
-- SISTEMA DE PARCEIROS — REFORMAÊ
-- Execute no Supabase Studio > SQL Editor
-- Execute na ordem: SQL 1 → SQL 2 → ... → SQL 6
-- ==============================================

-- ─────────────────────────────────
-- SQL 1: Tabela PARTNERS
-- ─────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  whatsapp TEXT,
  slug TEXT NOT NULL UNIQUE,
  commission_pct NUMERIC(5,2) NOT NULL DEFAULT 50.00,
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "partners_public_read" ON partners FOR SELECT USING (true);
CREATE POLICY "partners_service_write" ON partners FOR ALL USING (true);


-- ─────────────────────────────────
-- SQL 2: Tabela PARTNER_COUPONS
-- ─────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT DEFAULT 'none',   -- 'none' | 'fixed' | 'percent'
  discount_value NUMERIC(10,2) DEFAULT 0,
  max_uses INT DEFAULT NULL,
  uses_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE partner_coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coupons_public_read" ON partner_coupons FOR SELECT USING (true);
CREATE POLICY "coupons_service_write" ON partner_coupons FOR ALL USING (true);


-- ─────────────────────────────────
-- SQL 3: Tabela PARTNER_CLICKS
-- ─────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID REFERENCES partners(id),
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE partner_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clicks_insert_public" ON partner_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "clicks_service_read" ON partner_clicks FOR SELECT USING (true);


-- ─────────────────────────────────
-- SQL 4: Colunas extras em PROFISSIONAIS
-- ─────────────────────────────────
ALTER TABLE profissionais
  ADD COLUMN IF NOT EXISTS partner_id UUID REFERENCES partners(id),
  ADD COLUMN IF NOT EXISTS partner_coupon_id UUID REFERENCES partner_coupons(id),
  ADD COLUMN IF NOT EXISTS utm_ref TEXT;


-- ─────────────────────────────────
-- SQL 5: Tabela VIP_ORDERS
-- ─────────────────────────────────
CREATE TABLE IF NOT EXISTS vip_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES profissionais(id) ON DELETE SET NULL,
  partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
  partner_coupon_id UUID REFERENCES partner_coupons(id) ON DELETE SET NULL,
  gross_amount NUMERIC(10,2) NOT NULL DEFAULT 16.90,
  gateway_fee NUMERIC(10,2) NOT NULL DEFAULT 0.80,
  discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  final_amount_paid NUMERIC(10,2) NOT NULL,
  net_revenue NUMERIC(10,2) NOT NULL,
  commission_pct NUMERIC(5,2) DEFAULT 0,
  partner_commission_amount NUMERIC(10,2) DEFAULT 0,
  platform_revenue NUMERIC(10,2) NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  external_payment_id TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE vip_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "vip_orders_insert_public" ON vip_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "vip_orders_service_all" ON vip_orders FOR ALL USING (true);


-- ─────────────────────────────────
-- SQL 6: Tabela PARTNER_COMMISSIONS
-- ─────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_commissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
  vip_order_id UUID REFERENCES vip_orders(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',   -- 'pending' | 'paid'
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE partner_commissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "commissions_service_all" ON partner_commissions FOR ALL USING (true);


-- ─────────────────────────────────
-- SQL 7: Função para incrementar uso do cupom
-- (usada pelo webhook)
-- ─────────────────────────────────
CREATE OR REPLACE FUNCTION increment_coupon_uses(coupon_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE partner_coupons
  SET uses_count = uses_count + 1
  WHERE id = coupon_id;
END;
$$ LANGUAGE plpgsql;
