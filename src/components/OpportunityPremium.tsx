import React from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, 
  Lightbulb, 
  Flame, 
  DollarSign, 
  Zap, 
  Target, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  Users,
  Briefcase,
  Layers,
  Handshake,
  Wallet,
  Brain,
  MapPin,
  Settings
} from 'lucide-react';
import AppShowcase from './AppShowcase';

export default function OpportunityPremium() {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const growthPoints = [
    { title: 'Constrói a base de profissionais da sua cidade', icon: <Users className="w-5 h-5" /> },
    { title: 'Participa do crescimento desde o início', icon: <TrendingUp className="w-5 h-5" /> },
    { title: 'Se posiciona como referência local', icon: <Target className="w-5 h-5" /> },
    { title: 'Aproveita o maior potencial de crescimento', icon: <Rocket className="w-5 h-5" /> }
  ];

  const rolePoints = [
    { 
      title: 'Ativa profissionais', 
      desc: 'Traga os melhores talentos da sua região para a plataforma.',
      icon: <Users className="text-blue-500" /> 
    },
    { 
      title: 'Acompanha a base', 
      desc: 'Monitore o engajamento e a qualidade dos atendimentos.',
      icon: <Layers className="text-indigo-500" /> 
    },
    { 
      title: 'Monitora a demanda', 
      desc: 'Entenda quais serviços são mais procurados na sua área.',
      icon: <Target className="text-purple-500" /> 
    },
    { 
      title: 'Gera receita', 
      desc: 'Lucra com a movimentação e fechamento de cada serviço.',
      icon: <Wallet className="text-emerald-500" /> 
    }
  ];

  const benefits = [
    {
      title: 'Crescimento escalável',
      desc: 'Quanto mais a rede cresce, maior o seu faturamento.',
      icon: <Zap className="w-6 h-6 text-yellow-500" />
    },
    {
      title: 'Receita recorrente',
      desc: 'Você ganha continuamente com os serviços gerados na sua região.',
      icon: <Wallet className="w-6 h-6 text-emerald-500" />
    },
    {
      title: 'Gestão inteligente',
      desc: 'Acompanhe tudo através de um painel completo com métricas reais.',
      icon: <Brain className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Exclusividade regional',
      desc: 'Você opera e desenvolve o mercado na sua área.',
      icon: <MapPin className="w-6 h-6 text-red-500" />
    },
    {
      title: 'Plataforma pronta',
      desc: 'Toda a tecnologia, sistema e operação já estão desenvolvidos.',
      icon: <Settings className="w-6 h-6 text-slate-500" />
    },
    {
      title: 'Suporte dedicado',
      desc: 'Você não está sozinho — tem suporte para crescer com segurança.',
      icon: <Handshake className="w-6 h-6 text-indigo-500" />
    }
  ];

  return (
    <section className="bg-white overflow-hidden" id="opportunity-premium">
      {/* Intro Header */}
      <div className="bg-slate-900 py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
              <Rocket className="w-3 h-3" />
              Por que ser parceiro do Reformaê?
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-8 md:mb-10 leading-[1.1] tracking-tighter">
              Você não está entrando em um app.<br className="hidden md:block" />
              <span className="text-primary italic">Está assumindo uma oportunidade de mercado na sua região.</span>
            </h2>
            <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
              O Reformaê está estruturando uma rede nacional de serviços, e os primeiros parceiros têm a chance de liderar a operação local desde o início.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Context - O que é o Reformaê */}
      <div className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full">
                <Lightbulb className="w-3 h-3" />
                O que é o Reformaê
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-6 md:mb-8 leading-tight tracking-tighter">
                Uma ponte sólida entre demanda e excelência profissional.
              </h3>
              <p className="text-lg text-slate-500 mb-6 leading-relaxed">
                O Reformaê é uma plataforma que conecta pessoas que precisam de serviços com profissionais qualificados, de forma rápida, organizada e segura.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Enquanto o cliente encontra soluções com facilidade, o parceiro gerencia toda a demanda da sua região, criando um fluxo constante de oportunidades e receita.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 bg-slate-50 rounded-[3rem] p-8 md:p-12 relative border border-slate-100 shadow-xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-bold tracking-[0.2em] text-orange-600 uppercase bg-orange-100 rounded-full">
                <Flame className="w-3 h-3" />
                Momento Estratégico
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-6">Por que o parceiro é essencial?</h4>
              <p className="text-slate-600 mb-8 font-medium">Estamos no momento mais estratégico do projeto. É agora que as regiões estão sendo ativadas.</p>
              
              <ul className="space-y-6">
                {growthPoints.map((pt, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                      {pt.icon}
                    </div>
                    {pt.title}
                  </li>
                ))}
              </ul>
              
              <div className="mt-10 pt-8 border-t border-slate-200">
                <p className="text-sm font-medium text-slate-500 italic">
                  👉 Depois que a região está consolidada, a oportunidade já não é a mesma.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Role - Seu papel no negócio */}
      <div className="py-20 md:py-32 bg-slate-900 text-white relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
              <Briefcase className="w-3 h-3" />
              Seu papel no negócio
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
              Você não executa os serviços.<br />
              <span className="text-primary opacity-90">Você gerencia a operação.</span>
            </h3>
            <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
              Um modelo escalável, sem equipe operacional e sem estrutura física. Toda a inteligência da plataforma trabalha para você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rolePoints.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {role.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{role.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits - Benefícios de ser parceiro */}
      <div className="py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Benefícios de ser <span className="text-primary italic">parceiro.</span>
            </h3>
            <p className="text-slate-500 text-lg">
              Oferecemos todas as ferramentas necessárias para você escalar seu negócio regional com segurança e rentabilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-10 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h4>
                <p className="text-slate-500 leading-relaxed text-sm flex-grow">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* App Showcase Carousel */}
      <AppShowcase />

      {/* Moment of Entry & Final CTA */}
      <div className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl"
          >
            {/* Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
                <Clock className="w-3 h-3" />
                Momento de Entrada
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 md:mb-8 tracking-tight leading-[1.1]">
                Estamos expandindo região por região.
              </h3>
              <div className="space-y-4 mb-10 md:mb-12 text-sm md:text-lg text-slate-300">
                <div className="flex items-start md:items-center justify-start md:justify-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-left md:text-center">Isso significa que existe um número limitado de oportunidades.</span>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-8 md:mt-10">
                  <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl flex-1 w-full text-left md:text-center">
                    <p className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-2">Pioneiros</p>
                    <p className="text-slate-200 text-xs md:text-sm">Quem entra agora participa da fase de crescimento exponencial.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl flex-1 w-full text-left md:text-center">
                    <p className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-2">Tardios</p>
                    <p className="text-slate-200 text-xs md:text-sm opacity-50">Quem entra depois, pega um mercado já disputado e fragmentado.</p>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-white/10 mb-10 md:mb-12"></div>

              <h4 className="text-lg md:text-3xl font-black text-white mb-10 md:mb-12 leading-relaxed">
                Você pode continuar assistindo esse mercado crescer… <br className="hidden md:block" />
                <span className="text-primary italic">ou assumir uma posição estratégica dentro dele.</span>
              </h4>

              <button 
                onClick={scrollToForm}
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black text-sm md:text-lg rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 mx-auto group"
              >
                Quero ser parceiro
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
