import React from 'react';
import { motion } from 'motion/react';
import { 
  Hammer, Paintbrush, Zap, Droplets, Wind, Sun, 
  Users, HardHat, Construction, Trash2, Layers, 
  Grid3X3, Brush, Pipette, Scissors, Box,
  Home, Sparkles, Shovel, Waves, Wrench, 
  Settings, Key, Bug, LayoutGrid
} from 'lucide-react';

const serviceCategories = [
  {
    title: "Construção e Reforma",
    services: [
      { name: "Pedreiro", icon: Hammer },
      { name: "Servente", icon: Users },
      { name: "Mestre de obras", icon: HardHat },
      { name: "Reforma geral", icon: Construction },
      { name: "Construção", icon: Home },
      { name: "Demolição", icon: Trash2 },
    ]
  },
  {
    title: "Acabamento",
    services: [
      { name: "Pintor", icon: Paintbrush },
      { name: "Gesseiro", icon: Layers },
      { name: "Drywall", icon: LayoutGrid },
      { name: "Revestimento", icon: Grid3X3 },
      { name: "Porcelanato", icon: Sparkles },
      { name: "Azulejista", icon: Grid3X3 },
    ]
  },
  {
    title: "Instalações",
    services: [
      { name: "Eletricista", icon: Zap },
      { name: "Encanador", icon: Droplets },
      { name: "Instalador hidráulico", icon: Droplets },
      { name: "Ar-condicionado", icon: Wind },
      { name: "Energia solar", icon: Sun },
    ]
  },
  {
    title: "Marcenaria e Estrutura",
    services: [
      { name: "Marceneiro", icon: Box },
      { name: "Carpinteiro", icon: Hammer },
      { name: "Serralheiro", icon: Scissors },
      { name: "Vidraceiro", icon: Pipette },
    ]
  },
  {
    title: "Serviços Gerais",
    services: [
      { name: "Diarista", icon: Sparkles },
      { name: "Faxineira", icon: Sparkles },
      { name: "Limpeza pós-obra", icon: Trash2 },
      { name: "Jardinagem", icon: Shovel },
      { name: "Piscineiro", icon: Waves },
    ]
  },
  {
    title: "Manutenção",
    services: [
      { name: "Montador de móveis", icon: Wrench },
      { name: "Técnico em eletrodomésticos", icon: Settings },
      { name: "Chaveiro", icon: Key },
      { name: "Dedetização", icon: Bug },
    ]
  }
];

export default function ExpansionServiceGrid() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-[#2C47DD] uppercase bg-[#2C47DD]/10 rounded-full"
          >
            <LayoutGrid className="w-4 h-4" />
            Mais de 30 categorias disponíveis
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.05] tracking-tight">
            Todos os serviços que movimentam <br className="hidden md:block" />
            sua região, <span className="text-[#2C47DD]">em um só lugar.</span>
          </h2>
          
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Do pequeno reparo à reforma completa, o Reformaê conecta clientes a profissionais em diversas categorias.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-16">
          {serviceCategories.map((category, catIdx) => (
            <div key={catIdx} className="flex flex-col items-center w-full">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 text-center">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full">
                {category.services.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ 
                        y: -5,
                        backgroundColor: "rgba(44, 71, 221, 0.02)",
                      }}
                      className="w-[calc(50%-0.375rem)] sm:w-[160px] md:w-[180px] lg:w-[190px] flex-shrink-0 group bg-white p-4 md:p-6 rounded-[1.25rem] md:rounded-[1.5rem] border border-slate-100 hover:border-[#2C47DD]/20 transition-all duration-300 relative cursor-default"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#2C47DD]/5 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-[#2C47DD] transition-all duration-500">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#2C47DD] group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-[10px] md:text-sm font-bold text-slate-700 group-hover:text-[#2C47DD] transition-colors line-clamp-2 min-h-[1lh]">
                          {service.name}
                        </span>
                        
                        {/* Tooltip hint on hover */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none mb-2 z-20">
                          Alta demanda na sua região
                          <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100">
            <p className="text-slate-500 leading-relaxed font-medium">
              "O Reformaê foi criado para atender desde pequenas demandas do dia a dia até grandes projetos de reforma, gerando oportunidades constantes para quem faz parte da rede."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
