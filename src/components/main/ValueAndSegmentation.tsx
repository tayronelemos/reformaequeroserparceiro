import React from 'react';
import { motion } from 'motion/react';
import {
  MousePointer2, Briefcase, Building2, ArrowRight,
  CheckCircle2, TrendingUp, Handshake, Zap
} from 'lucide-react';

export default function ValueAndSegmentation() {
  return (
    <>
      {/* Value Psychological Section */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-6">Você não está entrando em um app.</h3>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
              Está acessando uma <span className="text-primary italic">oportunidade real</span> de mercado na sua região.
            </h2>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              O Reformaê resolve um problema real: encontrar profissionais confiáveis de forma rápida.
              E transforma isso em oportunidade para quem presta serviço e para quem quer crescer com a gente.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-6"><TrendingUp className="w-6 h-6" /></div>
                <h4 className="text-xl font-bold text-white mb-3">Demanda Constante</h4>
                <p className="text-slate-400 text-sm">Milhares de novos serviços são pesquisados mensalmente por pessoas prontas para contratar.</p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white mb-6"><Handshake className="w-6 h-6" /></div>
                <h4 className="text-xl font-bold text-white mb-3">Parcerias Estratégicas</h4>
                <p className="text-slate-400 text-sm">Não somos apenas um app. Criamos um ecossistema onde empresas e profissionais prosperam juntos.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Segmentation Section */}
      <section className="py-28 bg-white relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(44,71,221,0.04),_transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs font-black tracking-[0.3em] text-primary uppercase mb-5">Onde você entra?</p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
              Escolha como você quer <br className="hidden md:block" />
              <span className="text-primary italic">fazer parte do Reformaê</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              O Reformaê conecta serviços, profissionais e oportunidades de negócio em uma única plataforma.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Card 1 — Parceiro Local */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative flex flex-col p-10 rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200"
            >
              {/* Decorative blob */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />

              {/* Icon */}
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-md border border-slate-100 mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Building2 className="w-7 h-7" />
              </div>

              {/* Label */}
              <span className="text-[10px] font-black tracking-[0.25em] text-slate-400 uppercase mb-2">
                Para empresas locais
              </span>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Quero gerar clientes</h3>

              {/* Description */}
              <p className="text-slate-500 text-[15px] leading-relaxed mb-8">
                Coloque sua empresa dentro do Reformaê e seja encontrado por clientes no momento exato da necessidade.
              </p>

              {/* Benefits */}
              <ul className="space-y-3 mb-10 flex-grow">
                {['Sua empresa visível no app', 'Geração de demanda qualificada', 'Divulgação direta para sua região'].map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    </div>
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="/parceiros"
                className="mt-auto flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-primary transition-colors"
              >
                Quero ser parceiro
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Card 2 — Profissional */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative flex flex-col p-10 rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-500/5 rounded-full group-hover:scale-150 transition-transform duration-700" />

              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-md border border-slate-100 mb-8 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <Briefcase className="w-7 h-7" />
              </div>

              <span className="text-[10px] font-black tracking-[0.25em] text-slate-400 uppercase mb-2">
                Para profissionais
              </span>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Quero trabalhar</h3>

              <p className="text-slate-500 text-[15px] leading-relaxed mb-8">
                Receba pedidos reais de clientes todos os dias e transforme sua habilidade em renda.
              </p>

              <ul className="space-y-3 mb-10 flex-grow">
                {['Clientes prontos para contratar', 'Mais visibilidade na sua região', 'Aumente sua renda com consistência'].map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                    </div>
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href="/trabalhe-conosco"
                className="mt-auto flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-green-600 transition-colors"
              >
                Quero ser profissional
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Card 3 — Parceiro (FEATURED) */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative flex flex-col p-10 rounded-3xl bg-slate-900 border border-white/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
            >
              {/* Glow Effect */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/25 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              {/* DESTAQUE Badge */}
              <div className="absolute top-6 right-6 px-3 py-1 bg-primary rounded-full text-[9px] font-black tracking-widest text-white uppercase">
                Oportunidade
              </div>

              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/40 mb-8 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-7 h-7" />
              </div>

              <span className="text-[10px] font-black tracking-[0.25em] text-primary uppercase mb-2">
                Para empresas e empreendedores
              </span>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                Quero crescer <br />com o Reformaê
              </h3>

              <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
                Entre como parceiro estratégico ou leve o Reformaê para sua cidade e participe da expansão da plataforma.
              </p>

              <ul className="space-y-3 mb-10 flex-grow">
                {['Geração de demanda local', 'Monetização recorrente', 'Participação no crescimento da rede'].map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3 text-primary" />
                    </div>
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href="/expansao"
                className="mt-auto w-full py-4 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all text-sm shadow-xl shadow-primary/20 group-hover:shadow-primary/40"
              >
                Ver oportunidades
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
