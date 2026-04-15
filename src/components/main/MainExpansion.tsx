import React from 'react';
import { motion } from 'motion/react';
import { Rocket, ArrowRight, MapPin, CheckCircle2, TrendingUp, Users } from 'lucide-react';

const stats = [
  { value: '2.000+', label: 'Profissionais ativos' },
  { value: '100%', label: 'João Pessoa validado' },
  { value: '1ª', label: 'Expansão no Nordeste' },
];

export default function MainExpansion() {
  return (
    <section id="expansao" className="py-20 bg-slate-900 overflow-hidden relative border-t border-white/5">
      {/* Subtle center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-black tracking-[0.2em] text-primary uppercase bg-white/5 rounded-full border border-white/10">
              <Rocket className="w-3 h-3" />
              Expansão Nacional 2026
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-[1.05]">
              Você não está entrando<br />
              em um app.{' '}
              <span className="text-primary italic">Está assumindo<br />
              uma oportunidade<br />
              de mercado.</span>
            </h2>

            <p className="text-base text-slate-400 mb-8 leading-relaxed max-w-lg">
              O Reformaê está estruturando uma rede nacional. Os primeiros parceiros lideram a operação local desde o início.
            </p>

            <a
              href="/expansao"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 group"
            >
              Levar para minha cidade
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right: Stats grid + proof */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <div className="text-2xl font-black text-primary mb-1">{s.value}</div>
                  <div className="text-[11px] text-slate-400 font-semibold leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: TrendingUp, title: 'Demanda real e constante', desc: 'Milhares de pedidos mensais por pessoas prontas para contratar.' },
                { icon: Users, title: 'Operação com suporte total', desc: 'Tecnologia, treinamento e equipe dedicada para o seu crescimento.' },
                { icon: CheckCircle2, title: 'Território exclusivo', desc: 'Apenas um representante por cidade. Seja o primeiro na sua região.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/8 transition-all">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-0.5">{item.title}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* João Pessoa badge */}
            <div className="flex items-center gap-3 px-5 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <MapPin className="w-4 h-4 text-green-400" />
              <span className="text-sm font-bold text-green-300">Expansão Nacional — operação 100% validada</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
