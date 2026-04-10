import React from 'react';
import { motion } from 'motion/react';
import { Bell, MessageSquare, Layout, Activity, CheckCircle2, ArrowRight, Zap, LogIn } from 'lucide-react';
import fotoHero from '../assets/images/foto-hero.png';

// Import images
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

export default function AppShowcase() {

  const benefits = [
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Notificações Diretas",
      text: "Envie ofertas e promoções diretamente para usuários da sua região."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Destaque nas Conversas",
      text: "Sua marca aparece como patrocinada dentro das mensagens."
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Anúncios no Feed",
      text: "Seja visto enquanto o cliente navega e busca serviços."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Presença Contínua",
      text: "Sua empresa sendo exibida diariamente dentro da plataforma."
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
                Formas reais de gerar vendas
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                Sua empresa aparece onde o cliente está <span className="text-primary italic">pronto para comprar</span>
              </h2>

              <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                No Reformaê, sua marca não fica escondida. Ela aparece em múltiplos pontos estratégicos dentro do app, alcançando usuários ativos todos os dias.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col gap-3 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0">
                      {React.cloneElement(benefit.icon as React.ReactElement, { size: 20 })}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1 text-base">{benefit.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{benefit.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-black text-slate-400 tracking-tight leading-tight">
                  Mais visibilidade. Mais oportunidades. <span className="text-slate-900">Mais vendas.</span>
                </h3>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 flex items-center justify-center gap-3 transition-all"
              >
                Quero minha empresa dentro do app
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            <div className="flex-1 relative w-full max-w-[360px] lg:max-w-[580px] ml-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Main Image Container */}
                <div className="relative z-10 w-full aspect-[4/4.8] rounded-[2rem] overflow-hidden">
                  <img 
                    src={fotoHero} 
                    alt="Parceiros Reformaê" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                {/* 1. Cadastre-se agora */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[52%] -left-12 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hidden md:block z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <LogIn className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-sm font-bold text-slate-800 pr-2">Cadastre-se agora.</div>
                  </div>
                </motion.div>

                {/* 2. Altas taxas de ganhos */}
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-[52%] -right-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hidden md:block z-20 w-44"
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none text-nowrap">Alto Desempenho</div>
                    </div>
                    <div className="text-sm font-extrabold text-slate-800 leading-tight">Altas taxas de ganhos</div>
                    {/* Mini Chart */}
                    <div className="flex items-end gap-1 h-10 pt-1">
                      <div className="flex-1 bg-slate-50 rounded-t-sm h-[30%]"></div>
                      <div className="flex-1 bg-slate-50 rounded-t-sm h-[50%]"></div>
                      <div className="flex-1 bg-primary/10 rounded-t-sm h-[40%]"></div>
                      <div className="flex-1 bg-primary rounded-t-sm h-[85%]"></div>
                      <div className="flex-1 bg-primary/30 rounded-t-sm h-[60%]"></div>
                      <div className="flex-1 bg-slate-100 rounded-t-sm h-[25%]"></div>
                    </div>
                  </div>
                </motion.div>

                {/* 3. 5k+ confiam */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-10 -right-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hidden md:block z-20"
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">5k+ confiam no Reformaê</div>
                    <div className="flex items-center">
                      <div className="flex -space-x-3 ml-1">
                        {[
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
                          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&q=80',
                          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80'
                        ].map((url, i) => (
                          <div key={i} className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-md ring-2 ring-slate-50 transform hover:scale-110 transition-transform cursor-pointer">
                            <img src={url} alt="Parceiro" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <div className="w-11 h-11 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-md ring-2 ring-slate-50">
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
