import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, ArrowRight, Target, Activity, CheckCircle2 } from 'lucide-react';
import jpImg from '../assets/images/local-joaopessoa.png';

export default function LocalProof() {
  
  // Dados reais baseados no IBGE 2024 e Tendências Imobiliárias
  const stats = [
    { 
      label: "População estimada", 
      value: "+888 mil", 
      icon: Users, 
      sub: "Fonte: IBGE 2024",
      desc: "Capital que mais cresceu no Nordeste entre 2022 e 2024."
    },
    { 
      label: "Crescimento Urbano", 
      value: "Contínuo", 
      icon: TrendingUp, 
      sub: "Expansão Ativa",
      desc: "Aumento recorde em novos alvarás de construção e condomínios."
    },
    { 
      label: "Foco Geográfico", 
      value: "Estratégico", 
      icon: Target, 
      sub: "Bairros em Alta",
      desc: "Expansão acelerada na orla e novas zonas de crescimento."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden" id="joao-pessoa">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* ESQUERDA: Imagem de Destaque */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <div className="relative group">
                <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-100">
                  <img 
                    src={jpImg} 
                    alt="João Pessoa - Mercado em Crescimento" 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Activity className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status do Mercado</p>
                        <p className="text-base font-black text-slate-900">Em expansão acelerada</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* DIREITA: Conteúdo + Dados + Simulador */}
            <div className="w-full lg:w-1/2">
              <div className="max-w-xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
                    Potencial Local
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                    João Pessoa está em crescimento — e a <span className="text-primary italic">demanda acompanha</span>
                  </h2>
                  <p className="text-lg text-slate-500 mb-10 font-medium leading-relaxed">
                    Com o avanço urbano e o aumento de novos imóveis, a busca por serviços e reformas cresce na cidade. João Pessoa é uma cidade em expansão, com crescimento constante em novos empreendimentos e bairros.
                  </p>
                </motion.div>

                {/* Bloco de Dados Reais */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <stat.icon className="w-5 h-5 text-primary" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight mb-1">{stat.value}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{stat.desc}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Benefícios Locais */}
                <div className="flex flex-col gap-4 mb-10">
                  {[
                    "Alcance dentro da sua cidade",
                    "Conexão com demanda existente",
                    "Posicionamento antecipado"
                  ].map((benefit, b) => (
                    <motion.div 
                      key={b}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (b * 0.1) }}
                      className="flex items-center gap-3 text-sm font-bold text-slate-700"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                      </div>
                      {benefit}
                    </motion.div>
                  ))}
                </div>

                {/* CTA Final */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-10"
                >
                  <div className="group relative inline-block w-full">
                    <div className="absolute -inset-1 bg-primary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                    <button className="relative w-full py-5 bg-primary text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3">
                      Garantir minha posição em João Pessoa
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                    O crescimento da cidade e da plataforma amplia o potencial de visibilidade ao longo do tempo.
                  </p>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
