-- SQL PARA CORRIGIR PERMISSÕES DO BANCO DE DADOS (SUPABASE)
-- Execute este script no seu 'SQL Editor' no painel do Supabase.

-- 1. Habilitar RLS em todas as tabelas (caso não estejam)
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vip_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE profissionais ENABLE ROW LEVEL SECURITY;

-- 2. Criar políticas para permitir acesso Anônimo (necessário para o Dashboard Mock)
-- NOTA: Como o seu admin não usa Supabase Auth real, precisamos liberar para o role 'anon'.

-- Tabela de Parceiros
DROP POLICY IF EXISTS "Permitir tudo para anon em partners" ON partners;
CREATE POLICY "Permitir tudo para anon em partners" ON partners FOR ALL USING (true) WITH CHECK (true);

-- Tabela de Cupons
DROP POLICY IF EXISTS "Permitir tudo para anon em partner_coupons" ON partner_coupons;
CREATE POLICY "Permitir tudo para anon em partner_coupons" ON partner_coupons FOR ALL USING (true) WITH CHECK (true);

-- Tabela de Cliques
DROP POLICY IF EXISTS "Permitir tudo para anon em partner_clicks" ON partner_clicks;
CREATE POLICY "Permitir tudo para anon em partner_clicks" ON partner_clicks FOR ALL USING (true) WITH CHECK (true);

-- Tabela de Comissões
DROP POLICY IF EXISTS "Permitir tudo para anon em partner_commissions" ON partner_commissions;
CREATE POLICY "Permitir tudo para anon em partner_commissions" ON partner_commissions FOR ALL USING (true) WITH CHECK (true);

-- Tabela de Ordens VIP
DROP POLICY IF EXISTS "Permitir tudo para anon em vip_orders" ON vip_orders;
CREATE POLICY "Permitir tudo para anon em vip_orders" ON vip_orders FOR ALL USING (true) WITH CHECK (true);

-- Tabela de Profissionais (Leads)
DROP POLICY IF EXISTS "Permitir tudo para anon em profissionais" ON profissionais;
CREATE POLICY "Permitir tudo para anon em profissionais" ON profissionais FOR ALL USING (true) WITH CHECK (true);

-- 3. Garantir permissões de acesso
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
