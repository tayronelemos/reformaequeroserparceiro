import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('ERRO: Variáveis de ambiente faltando no .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
  console.log('Tentando conectar na Supabase:', supabaseUrl);
  const { data, error, count } = await supabase
    .from('profissionais')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.log('ERRO NA CONEXÃO:', error.message);
  } else {
    console.log('CONEXÃO OK! ✅');
    console.log('Total de registros na tabela "profissionais":', count);
  }
}

checkData();
