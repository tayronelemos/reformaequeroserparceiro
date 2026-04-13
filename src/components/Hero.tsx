import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MapPin, Sparkles, CheckCircle2, BarChart3, Users, Mail, LogIn, Activity, Zap, MessageSquare } from 'lucide-react';
import logoDark from '../assets/images/logo-dark.png';
import fotoHero from '../assets/images/foto-hero.png';
import user1 from '../assets/images/7.jpeg';
import user2 from '../assets/images/8.jpeg';
import user3 from '../assets/images/9.jpeg';
import screen1 from '../assets/images/1.jpeg';
import screen2 from '../assets/images/13.jpeg';
import screen3 from '../assets/images/14.jpeg';
import screen4 from '../assets/images/15.jpeg';

const screens = [
  {
    image: screen1,
    title: "Anúncios no Feed",
    description: "Seja visto enquanto o cliente navega e busca serviços."
  },
  {
    image: screen2,
    title: "Notificações Diretas",
    description: "Envie ofertas e promoções diretamente para usuários da sua região."
  },
  {
    image: screen3,
    title: "Destaque nas Conversas",
    description: "Sua marca aparece como patrocinada dentro das mensagens."
  },
  {
    image: screen4,
    title: "Presença Contínua",
    description: "Sua empresa sendo exibida diariamente dentro da plataforma."
  }
];

export default function Hero() {
  const scrollToMap = () => {
    document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const [currentScreen, setCurrentScreen] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-white" id="home">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[150px]"></div>
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
                Oportunidade exclusiva para empresas da região
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-7xl font-black text-slate-900 leading-[0.95] mb-6 tracking-tighter">
                Seus próximos clientes já estão <span className="text-primary italic">procurando</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-slate-500 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium px-4 sm:px-0">
                Coloque sua empresa na frente de quem já está pronto <br className="hidden md:block" /> para comprar na sua região.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 xl:gap-6 w-full max-w-md mx-auto lg:mx-0">
                <button 
                  onClick={scrollToForm}
                  className="w-full sm:w-auto h-16 px-10 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center relative group shadow-lg shadow-primary/20 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 transition-transform group-hover:-translate-x-3">Garantir minha parceria</span>
                  <ArrowRight className="w-5 h-5 absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all" />
                </button>
                <button 
                  onClick={() => window.location.href = '/convite'}
                  className="w-full sm:w-auto h-16 px-10 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center relative active:scale-95 overflow-hidden"
                >
                  <span className="mx-auto uppercase text-xs tracking-widest">Entrar no Grupo</span>
                </button>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-50 grayscale">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Tecnologia Validada</div>
                <div className="h-px w-12 bg-slate-200"></div>
                <div className="flex gap-6 items-center">
                  <img src={logoDark} alt="Reformaê" className="h-6 w-auto opacity-80" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 relative flex justify-center items-center">
            {/* Decorative Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-[20%] -translate-y-[40%] w-[80%] h-[80%] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              {/* iPhone Mockup Frame */}
              <div className="relative w-[260px] h-[530px] md:w-[320px] md:h-[650px] bg-slate-900 rounded-[3.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[8px] border-slate-800">
                {/* Dynamic Island */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[70px] h-[22px] bg-slate-900 rounded-full z-40"></div>
                
                {/* Inner Content - Screen */}
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentScreen}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: "anticipate" }}
                      className="w-full h-full"
                    >
                      <img 
                        src={screens[currentScreen].image} 
                        alt={screens[currentScreen].title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Physical Detail Mockup */}
                <div className="absolute left-[-12px] top-32 w-[4px] h-[50px] bg-slate-800 rounded-l-md"></div>
                <div className="absolute left-[-12px] top-48 w-[4px] h-[50px] bg-slate-800 rounded-l-md"></div>
                <div className="absolute right-[-12px] top-40 w-[4px] h-[75px] bg-slate-800 rounded-r-md"></div>
              </div>

              {/* Floating UI Element 1: Smart Info Bar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-20 top-[15%] bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 z-20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/10 text-green-600 rounded-lg flex items-center justify-center">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Status</p>
                    <p className="text-xs font-bold text-slate-900 leading-none">Campanha Ativa</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating UI Element 2: Stats Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -right-20 bottom-[30%] bg-slate-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-slate-700 z-20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                    <Activity size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Engajamento</p>
                    <p className="text-xs font-bold text-white leading-none">+85% Click-through</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Screen Indicator Card */}
              <motion.div
                key={`hero-badge-${currentScreen}`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute -right-28 top-[5%] bg-white p-4 rounded-[1.5rem] shadow-2xl border border-slate-100 max-w-[160px] z-30 hidden md:block"
              >
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-2">
                  <Zap size={16} fill="currentColor" />
                </div>
                <p className="text-[9px] font-bold text-primary uppercase tracking-wider mb-1">Impacto Real</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">{screens[currentScreen].title}</p>
              </motion.div>

              {/* Navigation Pips */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                {screens.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentScreen(i)}
                    className={`h-2 transition-all duration-300 rounded-full ${i === currentScreen ? 'w-8 bg-primary shadow-lg shadow-primary/20' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
