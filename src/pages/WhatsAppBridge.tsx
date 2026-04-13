import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, User, ChevronRight, Loader2, CheckCircle2, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import logoDark from '../assets/images/logo-dark.png';

export default function WhatsAppBridge() {
  const [formData, setFormData] = useState({ nome: '', whatsapp: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 2) val = `(${val.slice(0,2)}) ${val.slice(2)}`;
    if (val.length > 9) val = `${val.slice(0,9)}-${val.slice(9)}`;
    setFormData({ ...formData, whatsapp: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Salva no Supabase como um lead vindo do link direto
      const { error } = await supabase.from('profissionais').insert([
        {
          nome: formData.nome,
          sobrenome: '(Link Direto)',
          whatsapp: formData.whatsapp,
          email: 'lead-whatsapp@reformae.com',
          cidade: 'João Pessoa',
          estado: 'PB',
          categorias: ['whatsapp-direto'],
          descricao: 'Entrou pelo link de convite compartilhado.',
          is_vip: false,
          created_at: new Date().toISOString()
        }
      ]);

      if (error) throw error;

      setSuccess(true);
      
      // Redireciona para o grupo após 1.5s
      setTimeout(() => {
        window.location.href = 'https://chat.whatsapp.com/Dj4MdEFoAvTAoPe4FNc46o?mode=gi_t';
      }, 1500);

    } catch (err) {
      console.error('Erro ao salvar lead:', err);
      // Mesmo com erro, libera o acesso para não frustrar o usuário
      window.location.href = 'https://chat.whatsapp.com/Dj4MdEFoAvTAoPe4FNc46o?mode=gi_t';
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <img src={logoDark} alt="Reformaê" className="h-10 mx-auto mb-6" />
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">Convite para o Grupo</h1>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-2">Profissionais de João Pessoa</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden relative">
          {success ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-xl font-black text-slate-900">Tudo pronto!</h2>
              <p className="text-slate-500 font-medium">Você será redirecionado para o WhatsApp em instantes...</p>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Seu Primeiro Nome</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="text"
                      placeholder="Ex: João"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      className="w-full h-14 pl-12 pr-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Seu WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="text"
                      placeholder="(83) 99999-9999"
                      value={formData.whatsapp}
                      onChange={handlePhoneChange}
                      className="w-full h-14 pl-12 pr-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-3 group"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <MessageSquare size={20} />
                    ENTRAR NO GRUPO AGORA
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                Ao entrar, você concorda com nossos termos <br /> de uso para profissionais parceiros.
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-slate-500 text-xs font-bold mt-8">
          &copy; 2026 Reformaê - Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
}
