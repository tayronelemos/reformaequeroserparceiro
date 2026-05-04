import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, CreditCard, Percent, BadgeCheck, ArrowRight, Star } from 'lucide-react';

export function ExpansionInvestment() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* ── TOP: Header (white bg) ── */}
      <div className="relative z-10 pt-28 pb-16 text-center px-4">
        {/* Subtle blobs behind header */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
            <Star className="w-3 h-3 fill-primary" />
            Investimento para Adesão
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.95] tracking-tight mb-5">
            Quanto custa ativar<br />
            <span className="text-primary italic">a sua cidade?</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-lg mx-auto leading-relaxed">
            Um investimento único para garantir exclusividade total na sua cidade e começar a gerar renda recorrente.
          </p>
        </motion.div>
      </div>

      {/* ── BOTTOM: Full-width dark panel ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 md:px-16 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* ── LEFT: Price ── */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-slate-400 text-xs uppercase tracking-[0.25em] font-bold mb-5">
                Taxa de Adesão à Cidade
              </p>

              <div className="flex items-end justify-center lg:justify-start gap-1 mb-4">
                <span className="text-slate-400 text-2xl font-bold self-start mt-4">R$</span>
                <span className="text-[6rem] md:text-[8rem] font-black text-white leading-none tracking-tight">
                  1.899
                </span>
                <span className="text-white text-4xl font-bold self-end mb-3">,90</span>
              </div>

              {/* Installment pill */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl cursor-default"
              >
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="text-white font-bold text-lg">
                  ou <span className="text-primary font-black">10x</span> no cartão
                </span>
              </motion.div>

              <p className="text-slate-600 text-sm mt-4">Pagamento seguro · Sem taxas ocultas</p>
            </div>

            {/* Vertical divider */}
            <div className="hidden lg:block self-stretch w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            {/* Horizontal divider mobile */}
            <div className="block lg:hidden w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* ── RIGHT: Earnings + guarantees ── */}
            <div className="flex-1 w-full">
              {/* 65% card */}
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 280 }}
                className="relative bg-primary rounded-3xl p-8 mb-8 shadow-2xl shadow-blue-900/50 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/5 rounded-full" />

                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                    <Percent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-100 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
                      Sua participação na cidade
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-white text-7xl font-black leading-none">65</span>
                      <span className="text-white/80 text-3xl font-bold">%</span>
                    </div>
                    <p className="text-blue-100 text-sm mt-1 leading-snug">
                      sobre cada serviço fechado na sua região
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Guarantees */}
              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, text: 'Exclusividade territorial garantida em contrato' },
                  { icon: TrendingUp,  text: 'Lucro recorrente e crescente com a demanda' },
                  { icon: BadgeCheck,  text: 'Suporte dedicado desde o primeiro dia' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-slate-300 leading-relaxed">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="mt-16 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.a
              href="#lead-form"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-12 py-5 bg-primary text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-900/40 hover:bg-blue-500 transition-colors duration-300"
            >
              Quero ativar minha cidade
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <p className="text-slate-500 text-sm">Vagas limitadas por cidade</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
