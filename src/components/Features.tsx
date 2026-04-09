import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, HardHat, Monitor, Check, DollarSign, PieChart, ArrowUpRight, Wallet, Calculator, Sparkles, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

export function Features() {
  const clientFeatures = [
    'Publique solicitações com fotos e detalhes do serviço',
    'Receba até 10 orçamentos de profissionais qualificados',
    'Compare perfis, avaliações e experiências reais',
    'Acompanhe todo o andamento do serviço em tempo real'
  ];

  const proFeatures = [
    'Receba solicitações reais de clientes da sua região',
    'Envie propostas de forma rápida e estratégica',
    'Organize sua agenda e gerencie seus atendimentos',
    'Destaque seu portfólio e conquiste avaliações positivas'
  ];

  const systemFeatures = [
    'Acompanhe em tempo real todos os usuários cadastrados',
    'Visualize a demanda ativa de serviços na sua área',
    'Monitore ganhos, comissões e valores a receber',
    'Acesse métricas completas de performance da sua região'
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
            <Sparkles className="w-3 h-3" />
            Ecossistema Completo
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[0.95] tracking-tight">
            Uma plataforma desenhada para <span className="text-primary italic">conectar.</span>
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed">
            O Reformaê é mais que um app, é um ecossistema que resolve as dores de todos os lados do mercado de reformas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Clients Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Users className="w-32 h-32" />
            </div>
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-8 text-slate-900">Para Clientes</h3>
            <ul className="space-y-5">
              {clientFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-600 font-medium">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Professionals Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <HardHat className="w-32 h-32" />
            </div>
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100">
              <HardHat className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold mb-8 text-slate-900">Para Profissionais</h3>
            <ul className="space-y-5">
              {proFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-600 font-medium">
                  <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-orange-600" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* System Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl shadow-slate-200"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Monitor className="w-32 h-32" />
            </div>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
              <Monitor className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-8 leading-tight">Tenha controle total da operação na sua região</h3>
            <ul className="space-y-5">
              {systemFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-400 font-medium">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Earnings() {
  const [credits, setCredits] = useState(300);
  const [niche, setNiche] = useState('medios');
  const [conversionRate, setConversionRate] = useState(20);
  const [ticket, setTicket] = useState(2500);

  // Constants
  const creditPackages = {
    100: 200,
    300: 570,
    500: 900
  };
  const nicheCosts = {
    pequenos: 5,
    medios: 10,
    grandes: 20
  };
  const nicheNames = {
    pequenos: 'Pequenos Serviços',
    medios: 'Serviços Médios',
    grandes: 'Grandes Obras'
  };

  const cost = creditPackages[credits as keyof typeof creditPackages] || (credits * 2);
  const costPerLead = nicheCosts[niche as keyof typeof nicheCosts];
  const leads = Math.floor(credits / costPerLead);
  const closedJobs = Math.floor((leads * conversionRate) / 100);
  const revenue = closedJobs * ticket;
  const netProfit = revenue - cost;
  const roi = cost > 0 ? ((netProfit / cost) * 100) : 0;

  // Formatting helpers
  const formatBRL = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden" id="simulator">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 rounded-full">
            <TrendingUp className="w-4 h-4" />
            Simulador Financeiro
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight">
            Descubra o potencial de <span className="text-primary">lucratividade</span> da sua rede.
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Veja exatamente por que os profissionais da sua cidade vão querer comprar seus créditos. Simule o retorno sobre o investimento baseado em dados reais do mercado.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* LEFT: Controls */}
          <div className="flex-[1.2] bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Parâmetros do Mercado</h3>
            
            <div className="space-y-10">
              {/* Credits & Combo */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="font-bold text-slate-700">Pacote de Créditos</label>
                  <span className="text-primary font-black text-xl">{credits} crs</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  {[100, 300, 500].map(val => (
                    <button 
                      key={val}
                      onClick={() => setCredits(val)}
                      className={`flex-1 py-3 rounded-2xl font-bold transition-all border-2 ${
                        credits === val 
                          ? 'border-primary bg-primary text-white shadow-lg shadow-blue-200' 
                          : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <div className="text-sm text-slate-500 text-right font-medium">Investimento: <strong className="text-slate-900">{formatBRL(creditPackages[credits as keyof typeof creditPackages])}</strong></div>
              </div>

              {/* Niche */}
              <div>
                <label className="font-bold text-slate-700 block mb-4">Especialidade / Nicho</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(nicheCosts).map(([key, cpl]) => (
                    <button 
                      key={key}
                      onClick={() => setNiche(key)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        niche === key 
                          ? 'border-primary bg-primary/5' 
                          : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className={`font-bold mb-1 ${niche === key ? 'text-primary' : 'text-slate-700'}`}>{nicheNames[key as keyof typeof nicheNames]}</div>
                      <div className="text-xs text-slate-500">{cpl} cr / lead</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversion Rate */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="font-bold text-slate-700">Taxa de Conversão</label>
                  <span className="text-slate-900 font-bold">{conversionRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="5" max="40" step="5"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                  <span>5% (Pessimista)</span>
                  <span>40% (Otimista)</span>
                </div>
              </div>

              {/* Average Ticket */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="font-bold text-slate-700">Ticket Médio (Valor do Serviço)</label>
                  <span className="text-slate-900 font-bold">{formatBRL(ticket)}</span>
                </div>
                <input 
                  type="range" 
                  min="800" max="5000" step="100"
                  value={ticket}
                  onChange={(e) => setTicket(Number(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Warning box */}
              <div className="mt-8 bg-amber-50 border border-amber-100 p-5 rounded-2xl flex gap-4 items-start">
                <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-900 mb-1">Proteção contra disputa excessiva</h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Diferente de outras plataformas, <strong>cada solicitação recebe no máximo 10 profissionais</strong>. Suas chances de fechar negócio são reais e matemáticas.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Display Dashboard */}
          <div className="flex-1">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>
              
              <h3 className="text-xl font-bold text-slate-300 mb-10 relative z-10 flex items-center gap-3">
                <Calculator className="w-5 h-5 text-primary" /> Projeção de Resultados
              </h3>
              
              <div className="space-y-6 relative z-10 flex-grow">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 p-5 rounded-3xl">
                    <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Investimento</div>
                    <div className="text-2xl font-bold text-white">{formatBRL(cost)}</div>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 p-5 rounded-3xl">
                    <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Leads Gerados</div>
                    <div className="text-2xl font-bold text-white">{leads} contatos</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 p-5 rounded-3xl">
                    <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Orçamentos Fechados</div>
                    <div className="text-2xl font-bold text-white mb-1">{closedJobs} serviços</div>
                    <div className="text-xs text-slate-500">Com taxa de {conversionRate}% de conversão</div>
                </div>

                {/* Big Result */}
                <div className="mt-8 bg-gradient-to-br from-primary/20 to-indigo-600/20 border border-primary/30 p-8 rounded-[2rem] shadow-[0_0_40px_rgba(44,71,221,0.2)]">
                  <div className="text-sm font-bold text-blue-200 mb-2 uppercase tracking-wider">Lucro Líquido Estimado</div>
                  <motion.div 
                    key={netProfit}
                    initial={{ opacity: 0.5, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4"
                  >
                    {formatBRL(netProfit)}
                  </motion.div>
                  <div className="flex items-center gap-3">
                    <motion.div 
                      key={roi}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="bg-emerald-500 text-white font-bold px-3 py-1 rounded-xl text-sm inline-flex items-center gap-1"
                    >
                      <TrendingUp className="w-3 h-3" />
                      +{roi.toFixed(0)}% ROI
                    </motion.div>
                    <span className="text-slate-400 text-sm">retorno incrível no bolso</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-slate-800 relative z-10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Mostre estes números na sua cidade. Qualquer profissional entra na plataforma ao ver a matemática de conversão.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
