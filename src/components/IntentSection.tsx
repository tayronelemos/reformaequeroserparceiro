import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Target, Zap, MousePointer2, CheckCircle2 } from 'lucide-react';
import sessionImage from '../assets/images/foto-sessao.png';

export default function IntentSection() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden relative" id="oportunidade">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[11px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
                <Target className="w-3.5 h-3.5" />
                Diferente de tudo que você já viu
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight">
                Sua empresa no momento exato da <span className="text-primary italic relative">
                  decisão
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
              </h2>
              
              <div className="space-y-8 text-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  Todos os dias, pessoas entram no Reformaê procurando soluções reais para suas casas.
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-8 bg-gradient-to-br from-slate-50 to-white rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <MousePointer2 size={48} className="text-primary" />
                  </div>
                  <p className="text-slate-900 font-bold text-xl mb-3 flex items-center gap-2">
                    <CheckCircle2 className="text-primary w-5 h-5" />
                    Eles não estão apenas navegando.
                  </p>
                  <p className="text-slate-500">
                    Eles estão prontos para contratar, comprar ou resolver um problema agora mesmo.
                  </p>
                </motion.div>
                
                <p className="pl-4 border-l-4 border-primary/20">
                  É nesse momento que sua empresa aparece. Diferente das redes sociais, aqui você não disputa atenção — você <span className="text-slate-900 font-bold">se conecta com uma demanda já existente</span>.
                </p>
              </div>
            </motion.div>

            <div className="relative">
              {/* Image Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
              >
                <div className="relative">
                  <img 
                    src={sessionImage} 
                    alt="Reformaê App Experience" 
                    className="w-full h-auto relative z-10"
                  />
                </div>

                {/* Floating Content 1: High Intent */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="absolute -right-8 top-0 md:-right-20 md:top-10 z-20"
                >
                  <div className="bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 max-w-[240px]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
                        <Zap size={20} fill="currentColor" />
                      </div>
                      <h4 className="font-bold text-slate-900">Alta Intenção</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Usuários com objetivo claro de contratar serviços profissionais.
                    </p>
                  </div>
                </motion.div>

                {/* Floating Content 2: Perfect Match */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="absolute -left-8 bottom-20 md:-left-16 md:bottom-32 z-20"
                >
                  <div className="bg-slate-900 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-800 max-w-[240px]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white text-slate-900 rounded-xl flex items-center justify-center shrink-0">
                        <Target size={20} />
                      </div>
                      <h4 className="font-bold text-white">Match Perfeito</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Conexão direta no exato momento da busca por uma solução.
                    </p>
                  </div>
                </motion.div>
                
                {/* Decorative Elements - Subtle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl -z-10"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
