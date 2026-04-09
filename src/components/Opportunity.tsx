import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, Zap, ShieldCheck, Globe, BarChart3 } from 'lucide-react';

export function Opportunity() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1">
            <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
              O Modelo de Negócio
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[0.95] tracking-tight">
              Transforme sua cidade em uma fonte de <span className="text-primary italic">renda recorrente.</span>
            </h2>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed">
              O Reformaê conecta clientes a profissionais da construção e reforma. Você pode ser o responsável por fazer isso acontecer na sua cidade.
            </p>
            
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 mb-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-2xl font-bold text-slate-900 relative z-10">
                Você ativa o mercado. <br />
                <span className="text-primary">A plataforma faz o resto.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                'Exclusividade por cidade',
                'Plataforma pronta',
                'Crescimento escalável',
                'Baixa concorrência inicial'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm uppercase tracking-wider">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-6 pt-12">
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-slate-200"
              >
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-8">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-4">Escalável</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Cresça conforme a demanda da sua região aumenta sem limites geográficos.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-slate-900">Ágil</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Ativação rápida e suporte dedicado para você começar a faturar em dias.</p>
              </motion.div>
            </div>
            
            <div className="space-y-6">
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-primary p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-200"
              >
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-4">Territorial</h4>
                <p className="text-blue-100 text-sm leading-relaxed">Domine sua região com exclusividade total garantida em contrato.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-slate-100 p-10 rounded-[3rem] border border-slate-200"
              >
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-8">
                  <BarChart3 className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-slate-900">Analítico</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Dashboard completo para acompanhar cada centavo gerado na sua cidade.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Você ativa sua cidade',
      description: 'Inicie a operação local e comece a cadastrar os melhores profissionais da região com nossa metodologia.'
    },
    {
      number: '02',
      title: 'Clientes solicitam serviços',
      description: 'Através do app, clientes publicam pedidos reais de reforma e construção todos os dias.'
    },
    {
      number: '03',
      title: 'Você ganha com a movimentação',
      description: 'Receba uma participação recorrente sobre cada serviço fechado na sua cidade de forma automática.'
    }
  ];

  return (
    <section className="py-32 bg-slate-900 text-white overflow-hidden relative" id="how-it-works">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Passo a Passo</div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Como funciona a sua jornada de parceiro</h2>
          </div>
          <p className="text-slate-400 max-w-sm text-lg leading-relaxed mb-2">
            Um modelo de negócio simples, direto e validado por centenas de operações.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative group"
            >
              <div className="text-8xl font-black text-white/5 mb-[-40px] group-hover:text-primary/10 transition-colors duration-500">
                {step.number}
              </div>
              <div className="relative z-10 pl-4 border-l-2 border-primary/30 group-hover:border-primary transition-colors duration-500">
                <h3 className="text-2xl font-bold mb-6">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
