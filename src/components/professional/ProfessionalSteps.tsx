import React from 'react';
import { motion } from 'motion/react';
import { UserCheck, ListChecks, MessageSquareText } from 'lucide-react';

const steps = [
  {
    icon: UserCheck,
    title: "1. Cadastre-se gratuitamente",
    description: "Preencha seus dados básicos e escolha suas áreas de atuação."
  },
  {
    icon: ListChecks,
    title: "2. Entre na lista de espera",
    description: "Você fará parte da primeira seleção de profissionais da sua região."
  },
  {
    icon: MessageSquareText,
    title: "3. Receba oportunidades",
    description: "Quando o app lançar, os clientes chegarão diretamente até você."
  }
];

export default function ProfessionalSteps() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Como funciona</h2>
          <p className="text-slate-500 max-w-xl mx-auto font-medium">Três passos simples para você começar a receber serviços pelo app.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all hover:bg-white hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <step.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
