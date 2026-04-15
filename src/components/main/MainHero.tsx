import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

// Using assets available in the project
import logoClaro from '../../assets/images/logo-claro.png';
import fotoHero from '../../assets/images/foto-hero.png';
import fotoHero2 from '../../assets/images/foto-hero2.png';

export default function MainHero() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-32 overflow-hidden bg-white">
      {/* Background Accents REMOVED */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-[1.2] text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
                <Sparkles className="w-3 h-3" />
                A nova era das reformas chegou
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
                Sua reforma sem <br />
                <span className="text-primary italic">estresse.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Conectamos você aos melhores profissionais de reforma da sua região. Orçamentos rápidos, profissionais validados e segurança garantida.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href="/convite"
                  className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group"
                >
                  Fazer meu pedido
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button 
                  onClick={scrollToServices}
                  className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-black rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Conhecer serviços
                </button>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-100">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                    +2k
                  </div>
                </div>
                <div className="text-sm font-bold text-slate-400">
                   <span className="text-slate-900 font-black">2.000+</span> profissionais ativos
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 relative w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Visual - Shadow removed for clean look */}
              <div className="relative z-10 rounded-[3rem] overflow-hidden">
                <img 
                  src={fotoHero} 
                  alt="Reformaê App Hub" 
                  className="w-full h-auto"
                />
              </div>

              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-4 lg:-right-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 z-20 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Orçamento</div>
                    <div className="text-sm font-black text-slate-900 underline decoration-green-500 decoration-2">Aprovado e Garantido</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-16 -left-10 bg-slate-900 p-8 rounded-3xl shadow-2xl z-20 hidden md:block"
              >
                <div className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Suporte 24/7</div>
                <div className="text-2xl font-black text-white italic">"Ficou incrível!"</div>
                <div className="text-xs text-slate-400 mt-2">— Cliente Satisfeito</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
