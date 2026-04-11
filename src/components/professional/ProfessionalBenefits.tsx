import React from 'react';
import { motion } from 'motion/react';
import { Target, TrendingUp, Star, LayoutGrid, SearchX } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: "Clientes prontos para contratar",
    description: "O cliente entra no app com uma necessidade real. Você recebe leads qualificados."
  },
  {
    icon: TrendingUp,
    title: "Mais visibilidade local",
    description: "Seja encontrado por quem mora no seu bairro ou cidade sem gastar com anúncios."
  },
  {
    icon: Star,
    title: "Credibilidade por avaliações",
    description: "Crie seu portfólio digital e receba notas que ajudam você a fechar mais negócios."
  },
  {
    icon: LayoutGrid,
    title: "Organização garantida",
    description: "Acompanhe seus pedidos e atendimentos em um só lugar, de forma profissional."
  },
  {
    icon: SearchX,
    title: "Sem busca cansativa",
    description: "Pare de correr atrás de serviço. Deixe que as oportunidades cheguem até o seu celular."
  }
];

export default function ProfessionalBenefits() {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
              Por que ser um parceiro <span className="text-primary italic">Reformaê?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Diferente de redes sociais ou grupos de WhatsApp, aqui o foco é 100% em fechar serviços e profissionalizar sua marca.
            </p>
          </div>

          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
