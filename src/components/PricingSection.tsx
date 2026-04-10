import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Target, ShieldCheck, ArrowRight, Star, Zap } from 'lucide-react';

export default function PricingSection() {
  const scrollToForm = () => {
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
      leadForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 md:py-32 bg-slate-900 border-y border-slate-800 relative overflow-hidden" id="planos">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-center">
            
            {/* Left Side: Copy */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[11px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
                  <Star className="w-3.5 h-3.5" />
                  Oportunidade de Crescimento
                </div>
                
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.05]">
                  Um investimento baixo para uma <span className="text-primary italic">oportunidade alta</span>
                </h2>
                
                <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] mb-10 backdrop-blur-sm shadow-xl flex items-start gap-4">
                  <Zap className="w-6 h-6 text-primary shrink-0 mt-1" fill="currentColor" />
                  <p className="text-xl md:text-2xl text-white font-bold leading-relaxed">
                    <span className="text-primary italic">Menos de R$59 por mês, R$2 por dia</span> para posicionar sua empresa na frente de clientes prontos para comprar
                  </p>
                </div>

                <div className="space-y-6 text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto lg:mx-0">
                  <p className="text-white font-bold flex items-center gap-3 justify-center lg:justify-start">
                    <Zap className="text-primary w-5 h-5" fill="currentColor" />
                    Sem mensalidade. Sem taxas recorrentes.
                  </p>
                  <p className="text-slate-400">
                    Enquanto muitos negócios ainda dependem de indicação, você pode estar sendo encontrado todos os dias por novos clientes.
                  </p>
                  <p className="text-slate-300">
                    Um único investimento que coloca sua empresa dentro de um app com demanda ativa todos os dias.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                  {[
                    { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, text: "1 ano de presença" },
                    { icon: <Target className="w-5 h-5 text-emerald-400" />, text: "Exposição local" },
                    { icon: <ShieldCheck className="w-5 h-5 text-blue-400" />, text: "Posicionamento estratégico" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                      {item.icon}
                      <span className="text-xs md:text-sm text-white font-bold">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Side: Pricing Card */}
            <div className="lg:col-span-5 w-full max-w-[480px] mx-auto relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-red-500 text-white text-[11px] font-black uppercase tracking-[0.2em] px-8 py-2.5 rounded-full shadow-2xl animate-pulse">
                  VAGAS LIMITADAS
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[4rem] p-12 md:p-16 text-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                
                <div className="text-slate-400 text-xs font-black uppercase tracking-widest mb-8 block font-outfit">Oferta Exclusiva de Lançamento</div>
                
                <div className="flex justify-center items-start mb-4">
                  <span className="text-2xl font-bold text-slate-400 mt-3 mr-1">R$</span>
                  <span className="text-8xl font-black text-slate-900 tracking-tighter">699</span>
                  <div className="flex flex-col items-start mt-3">
                    <span className="text-3xl font-bold text-slate-400">,90</span>
                    <span className="text-sm font-bold text-slate-400 mt-1">à vista</span>
                  </div>
                </div>
                
                <div className="text-slate-900 font-black text-xl mb-12 flex flex-col items-center gap-1">
                  <span>ou parcelado no cartão</span>
                  <div className="h-1 w-12 bg-primary/20 rounded-full mt-2"></div>
                </div>

                <motion.button 
                  onClick={scrollToForm}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 px-10 rounded-3xl bg-primary text-white text-xl font-black hover:bg-primary/90 transition-all shadow-[0_20px_50px_rgba(44,71,221,0.3)] hover:shadow-[0_25px_60px_rgba(44,71,221,0.5)] flex items-center justify-center gap-3 mb-8 group"
                >
                  Quero minha empresa no Reformaê
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <div className="space-y-4 text-sm font-bold text-slate-500">
                  <p className="leading-relaxed">
                    As vagas são limitadas por região.<br />
                    <span className="text-slate-900">Quem entra primeiro, sai na frente.</span>
                  </p>
                  <p className="text-primary bg-primary/5 py-3 px-6 rounded-2xl border border-primary/10 font-black">
                    Garanta sua posição antes que sua categoria seja preenchida.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
