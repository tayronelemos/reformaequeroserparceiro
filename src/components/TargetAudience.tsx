import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Home, Users, HardHat, Sparkles } from 'lucide-react';

const segments = [
  { name: "Lojas de material de construção", icon: ShoppingCart },
  { name: "Imobiliárias", icon: Home },
  { name: "Corretores de Imóveis", icon: Users },
  { name: "Empresas de acabamento", icon: Sparkles },
  { name: "Serviços especializados", icon: HardHat }
];

export default function TargetAudience() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">
              Para quem <span className="text-primary italic">é</span> o Reformaê
            </h2>
            <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed">
              Se o seu negócio se conecta com obras, reformas ou imóveis, essa oportunidade estratégica é para você.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {segments.map((seg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-primary">
                    <seg.icon size={20} />
                  </div>
                  <span className="font-bold text-slate-800">{seg.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-primary p-12 rounded-[3.5rem] text-white relative overflow-hidden flex flex-col items-center text-center group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
              <h3 className="text-2xl font-black mb-6 relative z-10 leading-tight">
                Garanta sua posição no Reformaê na região
              </h3>
              <p className="text-white/80 font-medium mb-10 relative z-10">
                Esteja presente onde seus clientes estão procurando. Antecipe-se, posicione-se e cresça junto com a plataforma na capital.
              </p>
              <button 
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-16 px-8 bg-white text-primary font-black rounded-2xl hover:bg-slate-50 transition-all shadow-2xl relative z-10 active:scale-95 flex items-center justify-center gap-2"
              >
                Quero ser parceiro agora
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
