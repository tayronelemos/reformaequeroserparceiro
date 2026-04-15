import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

// Using local assets path relative to the new location in src/components/expansion/
import logoClaro from '../../assets/images/logo-claro.png';
import homeAppImage from '../../assets/images/home-app.jpeg';

export default function ExpansionHero() {
  const scrollToMap = () => {
    document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-slate-50">
      {/* Background Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-16">
          <div className="flex-[1.2] text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
                <Sparkles className="w-3 h-3" />
                Oportunidade de Negócio Exclusiva
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-7xl font-black text-slate-900 leading-[0.95] mb-6 tracking-tighter">
                Domine o mercado de <span className="text-primary">reformas</span> na sua região.
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-slate-500 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium px-4 sm:px-0">
                Seja o parceiro exclusivo do Reformaê e controle a demanda da sua cidade com uma plataforma 100% pronta.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 xl:gap-6">
                <button 
                  onClick={scrollToForm}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group"
                >
                  Quero ser parceiro
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={scrollToMap}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  Ver disponibilidade
                </button>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-50 grayscale">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Tecnologia Validada</div>
                <div className="h-px w-12 bg-slate-200"></div>
                <div className="flex gap-6 items-center">
                  <img src={logoClaro} alt="Reformaê" className="h-6 w-auto opacity-80" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main Mockup */}
              <div className="relative mx-auto w-[240px] h-[500px] xl:w-[260px] xl:h-[540px] bg-slate-900 rounded-[3rem] border-[10px] border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 xl:w-32 h-6 xl:h-7 bg-slate-800 rounded-b-3xl z-20"></div>
                <img 
                  src={homeAppImage} 
                  alt="Reformaê App" 
                  className="absolute inset-0 w-full h-full object-cover object-top z-10"
                />
              </div>
              
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 -left-12 xl:top-12 xl:-left-16 bg-white p-4 xl:p-5 rounded-3xl shadow-2xl border border-slate-100 hidden md:block z-40"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</div>
                    <div className="text-sm font-bold text-slate-900">Cidade Ativa</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-12 -right-8 xl:bottom-16 xl:-right-12 bg-slate-900 p-5 xl:p-6 rounded-3xl shadow-2xl hidden md:block z-40"
              >
                <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Ganhos Reais</div>
                <div className="text-2xl font-black text-white">R$ 24.500,00</div>
                <div className="text-[10px] text-slate-400 mt-1">Média mensal por cidade</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
