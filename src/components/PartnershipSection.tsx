import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { CheckCircle2, TrendingUp, ShieldCheck, Smartphone, Target, ArrowRight, Play, MapPin } from 'lucide-react';

export default function PartnershipSection() {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToMap = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="partnership" className="py-24 bg-slate-50 overflow-hidden relative">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Como fazer parte do Reformaê na sua cidade
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Estamos selecionando parceiros para assumir a operação local do app em regiões estratégicas.
          </motion.p>
        </div>

        {/* 1. O QUE VOCÊ RECEBE */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50/80 text-primary flex items-center justify-center mb-8 border border-blue-100/50 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Participação nos Resultados</h3>
            <div className="mb-4">
              <span className="text-[3.5rem] font-black text-primary leading-none tracking-tighter">40%</span>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed">
              de participação no lucro gerado dentro da sua cidade.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-50/80 text-emerald-600 flex items-center justify-center mb-8 border border-emerald-100/50 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Exclusividade Regional</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              Você se torna o <strong className="text-slate-900">responsável exclusivo</strong> pela operação do Reformaê na sua região demarcada.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-50/80 text-purple-600 flex items-center justify-center mb-8 border border-purple-100/50 group-hover:scale-110 transition-transform duration-300">
              <Smartphone size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Plataforma Pronta</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              Você recebe o <strong className="text-slate-900">app já estruturado e funcionando</strong> — não precisa desenvolver absolutamente nada.
            </p>
          </motion.div>
        </div>

        {/* 2. COMO FUNCIONA NA PRÁTICA */}
        <div className="max-w-5xl mx-auto mb-32">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-slate-600 uppercase bg-slate-200/50 rounded-full border border-slate-200">
              Passo a Passo
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900">Como funciona na prática</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative px-4">
            {/* Connection line for md screens */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-slate-200 z-0"></div>
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-black mb-6 shadow-xl ring-8 ring-slate-50 group-hover:bg-primary transition-colors duration-300">1</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Entrada como parceiro</h4>
              <p className="text-slate-500 leading-relaxed max-w-xs">Você garante sua cidade e entra como responsável pela região.</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-black mb-6 shadow-xl ring-8 ring-slate-50 group-hover:bg-primary transition-colors duration-300">2</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Ativação local</h4>
              <p className="text-slate-500 leading-relaxed max-w-xs">Iniciamos a divulgação e ativação de profissionais e clientes na sua área.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-black mb-6 shadow-xl ring-8 ring-slate-50 group-hover:bg-primary transition-colors duration-300">3</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Crescimento da operação</h4>
              <p className="text-slate-500 leading-relaxed max-w-xs">Você gerencia e participa diretamente do crescimento e dos resultados da sua cidade.</p>
            </motion.div>
          </div>
        </div>

        {/* 3. INVESTIMENTO & VALOR & POSICIONAMENTO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[1000px] mx-auto mb-16"
        >
          <div className="bg-slate-900 rounded-[40px] p-2 md:p-3 relative shadow-2xl flex flex-col lg:flex-row shadow-slate-900/20">
            
            {/* Left Content */}
            <div className="flex-1 p-8 md:p-12 text-white relative overflow-hidden rounded-[32px] lg:rounded-r-none">
              <div className="absolute top-0 right-0 right-[-10%] top-[-10%] w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
                  Transparência
                </div>
                
                <h3 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                  Investimento único para ativação da sua cidade
                </h3>
                
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  Para garantir a operação da sua região com qualidade e estrutura rigorosa, existe uma taxa única de adesão.
                </p>

                <p className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Esse valor cobre 100% de:</p>
                
                <ul className="space-y-5">
                  <li className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={18} strokeWidth={2.5} />
                    </div>
                    <span className="text-slate-300 font-medium text-lg">Ativação inicial da cidade</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={18} strokeWidth={2.5} />
                    </div>
                    <span className="text-slate-300 font-medium text-lg">Estratégias de tráfego pago</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={18} strokeWidth={2.5} />
                    </div>
                    <span className="text-slate-300 font-medium text-lg">Suporte técnico e operacional</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={18} strokeWidth={2.5} />
                    </div>
                    <span className="text-slate-300 font-medium text-lg">Manutenção da plataforma</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Content - Pricing Box */}
            <div className="w-full lg:w-[420px] bg-white rounded-[32px] p-8 md:p-10 z-10 text-center flex-shrink-0 flex flex-col justify-center border-4 border-slate-900 shadow-xl self-stretch m-1">
              <span className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-4 block">Taxa de Adesão</span>
              
              <div className="flex justify-center items-start mb-2">
                <span className="text-2xl font-bold text-slate-800 mt-2 mr-1">R$</span>
                <span className="text-6xl font-black text-slate-900 tracking-tighter">1.499</span>
                <span className="text-3xl font-bold text-slate-500 mt-1">,90</span>
              </div>
              
              <div className="mb-3 mt-1">
                <span className="text-primary font-bold bg-blue-50 py-1.5 px-4 rounded-full text-xs inline-block border border-blue-100">
                  Pagamento único via PIX ou Boleto
                </span>
              </div>

              <div className="text-center mt-3 mb-10">
                <div className="text-slate-800 font-bold text-lg">
                  Ou em até 10x de <span className="text-primary font-black">R$ 165,99</span> no cartão
                </div>
              </div>
              
              <div className="space-y-4 w-full">
                <button 
                  onClick={scrollToForm} 
                  className="w-full py-4 px-6 rounded-2xl bg-primary text-white text-lg font-bold hover:bg-primary-dark transition-all shadow-[0_8px_20px_rgba(26,111,232,0.3)] hover:shadow-[0_8px_30px_rgba(26,111,232,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  Quero ser parceiro 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={scrollToMap} 
                  className="w-full py-4 px-6 rounded-2xl bg-white text-slate-700 text-base font-bold hover:bg-slate-50 hover:text-slate-900 transition-all border-2 border-slate-200 hover:border-slate-300 flex items-center justify-center gap-2"
                >
                  <MapPin size={18} />
                  Ver disponibilidade
                </button>
              </div>
            </div>
            
          </div>
        </motion.div>
        
        {/* Posicionamento & Escassez */}
        <div className="max-w-3xl mx-auto text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[32px] border border-blue-100 mb-10"
          >
            <p className="text-slate-700 text-lg md:text-xl font-medium leading-relaxed">
              Você está entrando em uma <strong className="text-slate-900 font-extrabold">operação já pronta</strong>, com tecnologia estruturada e potencial de escala. <br className="hidden md:block" />
              O foco não é começar do zero — é crescer em cima de algo já validado.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-3 bg-red-50 text-red-700 px-6 py-4 rounded-full font-bold border border-red-100 shadow-sm"
          >
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span>Estamos liberando poucas cidades por vez para garantir qualidade na expansão.</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
