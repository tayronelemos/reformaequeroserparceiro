import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, MessageSquare, CheckCircle2, Zap, Rocket, Coins } from 'lucide-react';

export default function MainSteps() {
  const customerSteps = [
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: "1. Solicite o serviço",
      desc: "Descreva o que você precisa em poucos segundos pelo app."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "2. Receba orçamentos",
      desc: "Profissionais próximos visualizam e entram em contato direto."
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "3. Escolha e contrate",
      desc: "Compare avaliações, perfis e feche com total segurança."
    }
  ];

  const proSteps = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "1. Receba pedidos reais",
      desc: "Seja notificado sempre que alguém buscar seus serviços na região."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "2. Envie orçamento",
      desc: "Negocie direto pelo app e mostre a qualidade do seu trabalho."
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: "3. Feche serviços",
      desc: "Aumente sua renda, sua reputação e conquiste novos clientes."
    }
  ];

  return (
    <>
      <section id="app" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Customer Path */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Como funciona para quem <span className="text-primary">contrata</span>
            </h2>
            <p className="text-lg text-slate-600">Simples, rápido e eficiente. Do reparo à obra, a solução está no seu bolso.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {customerSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-all mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        </div>
      </section>

      {/* Professional Path - Dark Background for Premium Feel */}
      <section className="bg-slate-900 py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Como funciona para quem <span className="text-primary italic">trabalha</span>
            </h2>
            <p className="text-lg text-slate-400">Chega de depender de indicações. Acesse demanda real todos os dias.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {proSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-10 bg-white/5 backdrop-blur-sm rounded-[2.5rem] border border-white/10 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/20 transition-all group"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-all mb-8">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-base">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
