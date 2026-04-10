import React from 'react';
import { motion } from 'motion/react';
import { Target, Monitor, Users, CheckCircle2 } from 'lucide-react';

export default function AppDifferential() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Um ambiente criado para <span className="text-primary">gerar negócios</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            O Reformaê não é uma rede social. É uma plataforma de alta intenção, feita para quem sabe o que quer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">Objetivo Claro</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Diferente do scroll infinito, aqui o usuário entra com uma missão: resolver um problema em sua casa.
            </p>
          </div>

          <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-slate-900/20">
              <Monitor size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">Foco em Solução</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Cada visualização do seu negócio é qualificada. O usuário já passou da fase de curiosidade.
            </p>
          </div>

          <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Users size={120} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-bold mb-4 leading-tight relative z-10">Oportunidade Próxima</h3>
            <p className="text-slate-400 font-medium leading-relaxed relative z-10">
              Cada clique representa um cliente em potencial que já tem os recursos para investir na reforma.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
