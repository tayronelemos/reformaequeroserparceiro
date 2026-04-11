import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ProfessionalHero() {
  const scrollToForm = () => {
    document.getElementById('cadastro-profissional')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-slate-50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              Seja um Profissional Parceiro Reformaê
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Ganhe clientes todos os dias com o <span className="text-primary">Reformaê</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Estamos selecionando profissionais para fazer parte do app que vai conectar clientes a serviços como pedreiro, eletricista, diarista e muito mais.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={scrollToForm}
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-primary/20 text-lg"
              >
                Quero entrar na lista de espera
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-slate-500 font-medium opacity-80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Cadastro Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>João Pessoa e Região</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Lançamento em Breve</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
