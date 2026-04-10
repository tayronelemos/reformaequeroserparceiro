import React from 'react';
import { motion } from 'motion/react';
import { Share2, Users, Megaphone, Bell, MapPin, Trophy } from 'lucide-react';

const benefits = [
  {
    title: "Visibilidade direta",
    description: "Sua marca exibida para usuários ativos da sua região no momento da busca.",
    icon: Share2,
    color: "bg-blue-500"
  },
  {
    title: "Público qualificado",
    description: "Conecte-se com clientes que possuem intenção real de compra e contratação.",
    icon: Users,
    color: "bg-indigo-500"
  },
  {
    title: "Divulgação de ofertas",
    description: "Publique promoções e ofertas especiais diretamente dentro do ecossistema.",
    icon: Megaphone,
    color: "bg-emerald-500"
  },
  {
    title: "Notificações inteligentes",
    description: "Alcance usuários com campanhas diretas e lembretes sobre sua empresa.",
    icon: Bell,
    color: "bg-amber-500"
  },
  {
    title: "Presença local forte",
    description: "Posicione sua empresa como a maior referência no seu segmento na cidade.",
    icon: MapPin,
    color: "bg-rose-500"
  },
  {
    title: "Diferenciação competitiva",
    description: "Saia na frente da concorrência local garantindo sua vaga exclusiva.",
    icon: Trophy,
    color: "bg-purple-500"
  }
];

export default function BenefitsGrid() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase bg-slate-50 rounded-full border border-slate-100"
          >
            Destaques da Parceria
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-[0.95]"
          >
            Mais visibilidade. Mais oportunidades. <br />
            <span className="text-primary italic">Mais vendas.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 font-medium"
          >
            Um ecossistema desenhado para posicionar sua empresa no topo da mente do consumidor local.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] group transition-all duration-500"
            >
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mb-10 shadow-sm group-hover:shadow-md group-hover:border-primary/20 transition-all duration-500">
                <benefit.icon size={28} className="text-slate-900 group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors duration-500">{benefit.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-base">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
