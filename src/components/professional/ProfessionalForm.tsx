import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, CheckCircle2, AlertCircle, X, ChevronRight, HardHat, Zap, Droplets, 
  Paintbrush, Sprout, Home, Hammer, Ruler, GlassWater, Thermometer, UserCog, 
  MoreHorizontal, ChevronDown, MapPin, Search, Loader2, Crown, Sparkles, CreditCard,
  Copy, Check, Sofa, Bug, Waves, Baby, Tag, Users
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const categories = [
  { id: 'pedreiro', label: 'Pedreiro', icon: HardHat },
  { id: 'eletricista', label: 'Eletricista', icon: Zap },
  { id: 'encanador', label: 'Encanador', icon: Droplets },
  { id: 'pintor', label: 'Pintor', icon: Paintbrush },
  { id: 'jardineiro', label: 'Jardineiro', icon: Sprout },
  { id: 'diarista', label: 'Diarista', icon: Home },
  { id: 'marceneiro', label: 'Marceneiro', icon: Hammer },
  { id: 'gesseiro', label: 'Gesseiro', icon: Ruler },
  { id: 'vidraceiro', label: 'Vidraceiro', icon: GlassWater },
  { id: 'ar-condicionado', label: 'Técnico em Ar-condicionado', icon: Thermometer },
  { id: 'pos-obra', label: 'Limpeza pós-obra', icon: UserCog },
  { id: 'montador', label: 'Montador de móveis', icon: Sofa },
  { id: 'dedetizacao', label: 'Dedetização', icon: Bug },
  { id: 'piscineiro', label: 'Piscineiro', icon: Waves },
  { id: 'baba', label: 'Babá', icon: Baby },
  { id: 'outros', label: 'Outros', icon: MoreHorizontal },
];

const experienceOptions = [
  "Menos de 1 ano",
  "1 a 3 anos",
  "3 a 5 anos",
  "Mais de 5 anos"
];

const GROSS_AMOUNT = 49.90;
const GATEWAY_FEE = 0.80;

export default function ProfessionalForm() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    whatsapp: '',
    email: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    categorias: [] as string[],
    experiencia: '',
    descricao: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showVIPOffer, setShowVIPOffer] = useState(false);
  const [savedLeadId, setSavedLeadId] = useState<string | null>(null);
  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [isExpOpen, setIsExpOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<'IDLE' | 'PENDING' | 'PAID' | 'EXPIRED'>('IDLE');
  const [isGeneratingPix, setIsGeneratingPix] = useState(false);
  const [taxId, setTaxId] = useState('');
  const [copied, setCopied] = useState(false);
  const expRef = useRef<HTMLDivElement>(null);

  // ─── Partner Tracking State ───
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [utmRef, setUtmRef] = useState<string | null>(null);

  // ─── Coupon State ───
  const [couponCode, setCouponCode] = useState('');
  const [couponPartnerId, setCouponPartnerId] = useState<string | null>(null);
  const [couponId, setCouponId] = useState<string | null>(null);
  const [couponStatus, setCouponStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [couponMessage, setCouponMessage] = useState('');
  const [couponPartnerName, setCouponPartnerName] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(GROSS_AMOUNT);

  // ─── 1. Track partner from URL (?ref= or ?partner=) ───
  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref') || params.get('partner');
      if (!ref) return;

      setUtmRef(ref);

      try {
        const { data: partner } = await supabase
          .from('partners')
          .select('id, name')
          .eq('slug', ref)
          .eq('is_active', true)
          .single();

        if (partner) {
          setPartnerId(partner.id);
          setPartnerName(partner.name);
          sessionStorage.setItem('partner_id', partner.id);
          sessionStorage.setItem('partner_name', partner.name);

          // Register click
          await supabase
            .from('partner_clicks')
            .insert({ partner_id: partner.id, source_url: window.location.href });

          console.log(`[Partner Tracking] Parceiro identificado: ${partner.name}`);
        }
      } catch (err) {
        console.error('[Partner Tracking] Erro ao buscar parceiro:', err);
      }
    };

    // Restore from session if still tracking
    const storedId = sessionStorage.getItem('partner_id');
    const storedName = sessionStorage.getItem('partner_name');
    if (storedId) {
      setPartnerId(storedId);
      setPartnerName(storedName);
    }

    init();
  }, []);

  // ─── 2. Apply coupon ───
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponStatus('loading');
    setCouponMessage('');

    try {
      const res = await fetch(`/api/validate-coupon?code=${couponCode.trim().toUpperCase()}`);
      const data = await res.json();

      if (data.valid) {
        setCouponStatus('valid');
        setCouponMessage(data.message);
        setCouponId(data.coupon_id);
        setCouponPartnerId(data.partner_id);
        setCouponPartnerName(data.partner_name);

        // Override partner from URL if coupon provides one
        if (data.partner_id) {
          setPartnerId(data.partner_id);
          setPartnerName(data.partner_name);
        }

        // Apply discount
        if (data.discount_type === 'fixed' && data.discount_value > 0) {
          const disc = Math.min(data.discount_value, GROSS_AMOUNT);
          setDiscountAmount(disc);
          setFinalAmount(parseFloat((GROSS_AMOUNT - disc).toFixed(2)));
        } else if (data.discount_type === 'percent' && data.discount_value > 0) {
          const disc = parseFloat(((GROSS_AMOUNT * data.discount_value) / 100).toFixed(2));
          setDiscountAmount(disc);
          setFinalAmount(parseFloat((GROSS_AMOUNT - disc).toFixed(2)));
        }
      } else {
        setCouponStatus('invalid');
        setCouponMessage(data.message || 'Cupom inválido.');
      }
    } catch (err) {
      setCouponStatus('invalid');
      setCouponMessage('Erro ao validar cupom. Tente novamente.');
    }
  };

  // ─── Close dropdown when clicking outside ───
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expRef.current && !expRef.current.contains(event.target as Node)) {
        setIsExpOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleCategory = (catId: string) => {
    setFormData(prev => ({
      ...prev,
      categorias: prev.categorias.includes(catId)
        ? prev.categorias.filter(id => id !== catId)
        : [...prev.categorias, catId]
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 2) val = `(${val.slice(0,2)}) ${val.slice(2)}`;
    if (val.length > 9) val = `${val.slice(0,9)}-${val.slice(9)}`;
    setFormData({ ...formData, whatsapp: val });
  };

  const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    let masked = val;
    if (val.length > 3) masked = `${val.slice(0, 3)}.${val.slice(3)}`;
    if (val.length > 6) masked = `${masked.slice(0, 7)}.${masked.slice(7)}`;
    if (val.length > 9) masked = `${masked.slice(0, 11)}-${masked.slice(11)}`;
    setTaxId(masked);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    let masked = val;
    if (val.length > 5) masked = `${val.slice(0, 5)}-${val.slice(5)}`;
    setFormData(prev => ({ ...prev, cep: masked }));

    if (val.length === 8) {
      setIsFetchingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${val}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      } finally {
        setIsFetchingCep(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('profissionais')
        .insert([{
          ...formData,
          created_at: new Date().toISOString(),
          is_vip: false,
          partner_id: partnerId || null,
          partner_coupon_id: couponId || null,
          utm_ref: utmRef || null,
        }])
        .select();

      if (error) throw error;

      const newLead = data?.[0];
      if (newLead) setSavedLeadId(newLead.id);

      setIsSubmitting(false);
      setShowVIPOffer(true);

    } catch (error) {
      console.error("Erro ao salvar cadastro:", error);
      alert("Houve um erro ao enviar seu cadastro. Por favor, tente novamente.");
      setIsSubmitting(false);
    }
  };

  // ─── Polling for payment status ───
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (paymentStatus === 'PENDING' && checkoutData?.id) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/status?id=${checkoutData.id}`);
          const data = await res.json();
          if (data.status === 'PAID') {
            setPaymentStatus('PAID');
            clearInterval(interval);

            if (savedLeadId) {
              await supabase
                .from('profissionais')
                .update({ is_vip: true, vip_until: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString() })
                .eq('id', savedLeadId);
            }

            setTimeout(() => {
              window.location.href = 'https://chat.whatsapp.com/Ktz1yQSDWba91dHzRayhjs?mode=gi_t';
            }, 3000);
          }
        } catch (e) {
          console.error("Polling error", e);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [paymentStatus, checkoutData, savedLeadId]);

  return (
    <section id="cadastro-profissional" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 lg:p-16 border border-slate-100 shadow-2xl shadow-slate-200/50">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Comece seu cadastro</h2>
              <p className="font-medium text-slate-500">Estamos selecionando os melhores profissionais de João Pessoa.</p>
              
              {/* Partner Tag */}
              {partnerName && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-widest"
                >
                  <Users size={12} />
                  Indicado por: {partnerName}
                </motion.div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Categorias */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-8 uppercase tracking-widest leading-none">
                  Quais serviços você oferece? <span className="text-primary italic ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {categories.map((cat) => {
                    const isSelected = formData.categorias.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleToggleCategory(cat.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-3 ${
                          isSelected
                            ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/5'
                            : 'border-white bg-white text-slate-500 hover:border-slate-200 shadow-sm'
                        }`}
                      >
                        <cat.icon size={24} className={isSelected ? 'text-primary' : 'text-slate-400'} />
                        <span className="text-[11px] font-bold text-center leading-tight uppercase tracking-tight">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Informações Pessoais */}
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nome</label>
                  <input required type="text" placeholder="Seu nome" value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full h-14 px-6 bg-white rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-900" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Sobrenome</label>
                  <input required type="text" placeholder="Seu sobrenome" value={formData.sobrenome}
                    onChange={(e) => setFormData({...formData, sobrenome: e.target.value})}
                    className="w-full h-14 px-6 bg-white rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-900" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">WhatsApp</label>
                  <input required type="text" placeholder="(00) 00000-0000" value={formData.whatsapp}
                    onChange={handlePhoneChange}
                    className="w-full h-14 px-6 bg-white rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-900" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">E-mail</label>
                  <input required type="email" placeholder="exemplo@email.com" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-14 px-6 bg-white rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-900" />
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-8 pt-4">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center justify-between">
                      CEP
                      {isFetchingCep && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
                    </label>
                    <input required type="text" placeholder="00000-000" value={formData.cep}
                      onChange={handleCepChange}
                      className="w-full h-14 px-6 bg-white rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-900" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Rua / Logradouro</label>
                    <input required type="text" placeholder="Nome da rua" value={formData.rua}
                      onChange={(e) => setFormData({...formData, rua: e.target.value})}
                      className="w-full h-14 px-6 bg-white rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-900" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Número</label>
                    <input required type="text" placeholder="123" value={formData.numero}
                      onChange={(e) => setFormData({...formData, numero: e.target.value})}
                      className="w-full h-14 px-6 bg-white rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-900" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Bairro</label>
                    <input required type="text" placeholder="Nome do bairro" value={formData.bairro}
                      onChange={(e) => setFormData({...formData, bairro: e.target.value})}
                      className="w-full h-14 px-6 bg-white rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-900" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Cidade</label>
                    <input required type="text" placeholder="João Pessoa" value={formData.cidade}
                      onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                      className="w-full h-14 px-6 bg-white rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-900" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Estado</label>
                    <input required type="text" placeholder="PB" value={formData.estado}
                      onChange={(e) => setFormData({...formData, estado: e.target.value})}
                      className="w-full h-14 px-6 bg-white rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-900" />
                  </div>
                </div>
              </div>

              {/* Detalhes Profissionais */}
              <div className="space-y-8 pt-4">
                <div className="space-y-3" ref={expRef}>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Tempo de experiência</label>
                  <div className="relative">
                    <button type="button" onClick={() => setIsExpOpen(!isExpOpen)}
                      className="w-full h-14 px-6 bg-white rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-900 flex items-center justify-between">
                      <span className={formData.experiencia ? 'text-slate-900' : 'text-slate-400'}>
                        {formData.experiencia || 'Selecione sua experiência'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isExpOpen && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                          className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden py-2">
                          {experienceOptions.map((opt) => (
                            <button key={opt} type="button"
                              onClick={() => { setFormData({...formData, experiencia: opt}); setIsExpOpen(false); }}
                              className="w-full px-6 py-4 text-left hover:bg-primary/5 text-slate-700 font-bold text-sm transition-colors border-l-4 border-transparent hover:border-primary">
                              {opt}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Descreva sua experiência</label>
                  <textarea required placeholder="Conte um pouco sobre os serviços que você já realizou..."
                    value={formData.descricao} onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    className="w-full min-h-[160px] p-6 bg-white rounded-3xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-700 resize-none" />
                </div>
              </div>

              <div className="pt-8">
                <button type="submit" disabled={isSubmitting || formData.categorias.length === 0}
                  className="w-full h-18 bg-primary text-white font-black text-xl rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20 group py-5">
                  {isSubmitting ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : (
                    <>
                      Enviar meu cadastro
                      <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-center text-slate-400 text-xs mt-6 font-bold uppercase tracking-widest">
                  Processo seletivo em andamento
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative bg-white rounded-[3rem] p-10 md:p-12 w-full max-w-[500px] text-center shadow-2xl overflow-hidden">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">Cadastro realizado!</h3>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed text-lg">
                Você agora está na lista de espera. <br />
                <span className="text-emerald-600 font-bold">Redirecionando para o WhatsApp...</span>
              </p>
              <div className="space-y-4">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3 }} className="h-full bg-emerald-500" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIP Offer Overlay */}
      <AnimatePresence>
        {showVIPOffer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl" />

            <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl my-auto">

              {paymentStatus !== 'PAID' ? (
                <>
                  {/* Header */}
                  <div className="bg-primary p-6 md:p-10 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
                    <Sparkles className="w-8 h-8 mx-auto mb-4 text-yellow-300 animate-bounce" />
                    <h3 className="text-xl md:text-2xl font-black mb-2 tracking-tight leading-tight uppercase">
                      QUER SAIR NA FRENTE E <br /> SER <span className="text-yellow-300 underline decoration-2 underline-offset-4">LISTA VIP</span>?
                    </h3>
                    <p className="text-white/80 font-bold text-sm max-w-xs mx-auto">
                      Ganhe 2 meses grátis de uso do App Reformaê!
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-6 md:p-8 space-y-5">
                    {paymentStatus === 'IDLE' ? (
                      <>
                        {/* Benefits */}
                        <div className="grid grid-cols-2 gap-2">
                          {["Contatos na hora", "Orçamentos ilimitados", "Selo Verificado", "Grupo VIP WhatsApp"].map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <div className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                                <Check size={10} className="stroke-[4]" />
                              </div>
                              <span className="text-[9px] font-black text-slate-700 uppercase tracking-tight">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Price */}
                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-center">
                          <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-1">Oferta de Lançamento</p>
                          <div className="flex items-baseline gap-2 justify-center">
                            <span className="text-3xl font-black text-slate-900 tracking-tighter">
                              R$ {finalAmount.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                          {discountAmount > 0 && (
                            <p className="text-[9px] text-emerald-600 font-black mt-1 uppercase tracking-widest">
                              Desconto de R${discountAmount.toFixed(2).replace('.', ',')} aplicado!
                            </p>
                          )}
                          <p className="text-[9px] text-amber-600/70 font-bold mt-1 font-black uppercase tracking-widest leading-none">Pagamento único via PIX</p>
                        </div>

                        {/* ─── COUPON FIELD ─── */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                            <Tag size={12} className="text-primary" />
                            Tem um cupom de parceiro?
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Ex: JOAO50"
                              value={couponCode}
                              onChange={(e) => {
                                setCouponCode(e.target.value.toUpperCase());
                                if (couponStatus !== 'idle') {
                                  setCouponStatus('idle');
                                  setCouponMessage('');
                                }
                              }}
                              onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                              disabled={couponStatus === 'valid'}
                              className={`flex-1 h-12 px-4 rounded-xl border text-sm font-bold outline-none transition-all ${
                                couponStatus === 'valid'
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                                  : couponStatus === 'invalid'
                                  ? 'border-red-300 bg-red-50 text-red-700'
                                  : 'border-slate-300 bg-white text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/10'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={handleApplyCoupon}
                              disabled={couponStatus === 'loading' || couponStatus === 'valid' || !couponCode.trim()}
                              className="h-12 px-6 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-700 transition-all disabled:opacity-40 flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                            >
                              {couponStatus === 'loading' ? <Loader2 size={14} className="animate-spin" /> : 'Aplicar'}
                            </button>
                          </div>

                          {/* Coupon feedback */}
                          <AnimatePresence>
                            {couponStatus === 'valid' && (
                              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-100/50 p-2 rounded-lg border border-emerald-200">
                                <CheckCircle2 size={12} />
                                {couponMessage}
                              </motion.div>
                            )}
                            {couponStatus === 'invalid' && (
                              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-100/50 p-2 rounded-lg border border-red-200">
                                <AlertCircle size={12} />
                                {couponMessage}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* CPF field */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Seu CPF (obrigatório para PIX)</label>
                          <input
                            type="text"
                            placeholder="000.000.000-00"
                            value={taxId}
                            onChange={handleTaxIdChange}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <button
                            onClick={async () => {
                              if (taxId.replace(/\D/g, '').length < 11) {
                                alert("Por favor, informe um CPF válido para gerar o PIX.");
                                return;
                              }
                              setIsGeneratingPix(true);
                              try {
                                const res = await fetch('/api/create', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    amount: Math.round(finalAmount * 100),
                                    externalId: savedLeadId,
                                    taxId: taxId.replace(/\D/g, ''),
                                    name: `${formData.nome} ${formData.sobrenome}`,
                                    email: formData.email,
                                    cellphone: formData.whatsapp.replace(/\D/g, '')
                                  })
                                });

                                const contentType = res.headers.get('content-type');
                                if (contentType && contentType.includes('application/json')) {
                                  const data = await res.json();
                                  if (!res.ok) throw new Error(data.message || 'Erro no servidor');
                                  setCheckoutData(data);
                                  setPaymentStatus('PENDING');
                                } else {
                                  const errorText = await res.text();
                                  throw new Error(`Erro do Servidor (${res.status}): ${errorText.slice(0, 50)}`);
                                }
                              } catch (e: any) {
                                console.error("Erro ao gerar PIX:", e);
                                alert(`Atenção: Não foi possível gerar o PIX. Detalhes: ${e.message}`);
                              } finally {
                                setIsGeneratingPix(false);
                              }
                            }}
                            disabled={isGeneratingPix}
                            className="w-full h-14 bg-primary text-white font-black text-lg rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/30"
                          >
                            {isGeneratingPix ? <Loader2 className="animate-spin" /> : <><Crown size={20} /> QUERO SER VIP AGORA</>}
                          </button>

                          <button
                            onClick={() => {
                              setShowVIPOffer(false);
                              setShowSuccess(true);
                              setTimeout(() => {
                                window.location.href = 'https://chat.whatsapp.com/Dj4MdEFoAvTAoPe4FNc46o?mode=gi_t';
                              }, 3000);
                            }}
                            className="text-slate-400 font-bold text-[10px] uppercase tracking-widest py-2 hover:text-slate-600"
                          >
                            Não tenho interesse agora
                          </button>
                        </div>
                      </>
                    ) : (
                      /* ─── PIX Screen ─── */
                      <div className="text-center space-y-5 py-2 animate-in fade-in zoom-in duration-500">
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-widest">Escaneie o QR Code</h4>

                        <div className="w-52 h-52 mx-auto bg-slate-50 p-3 rounded-[2rem] border-2 border-primary/20 shadow-inner flex items-center justify-center relative group">
                          <img src={checkoutData?.brCodeBase64} alt="PIX" className="w-full h-full rounded-xl" />
                          <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[2rem]">
                            <p className="text-[10px] font-black tracking-widest text-primary">AGUARDANDO PAGAMENTO...</p>
                          </div>
                        </div>

                        <div className="space-y-3 max-w-sm mx-auto">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(checkoutData?.brCode || "");
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                            className={`w-full h-12 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all ${
                              copied ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                            {copied ? 'CÓDIGO COPIADO!' : 'COPIAR CÓDIGO PIX'}
                          </button>

                          {/* ─── Valor do Plano ─── */}
                          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100">
                            <span>Valor: <strong className="text-slate-600">R${finalAmount.toFixed(2).replace('.', ',')}</strong></span>
                          </div>

                          <div className="flex items-center gap-2 justify-center text-slate-400 text-[10px] font-black tracking-widest">
                            <Loader2 className="animate-spin w-4 h-4 text-primary" />
                            SISTEMA VERIFICANDO PAGAMENTO...
                          </div>
                        </div>

                        <button onClick={() => setPaymentStatus('IDLE')}
                          className="text-slate-400 font-bold text-[10px] uppercase tracking-widest underline underline-offset-4">
                          Voltar para o plano normal
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* ─── Success Screen ─── */
                <div className="p-20 text-center space-y-8 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl rotate-12">
                    <Crown size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black text-slate-900 tracking-tight">PARABÉNS, VIP! 💎</h3>
                    <p className="text-slate-500 font-bold text-lg">Seu pagamento foi confirmado com sucesso.</p>
                  </div>
                  <p className="text-xs font-black text-primary uppercase tracking-[0.4em] animate-pulse">Preparamos sua vaga no grupo VIP...</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
