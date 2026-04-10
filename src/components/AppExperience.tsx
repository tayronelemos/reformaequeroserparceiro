import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apple, Smartphone, ArrowRight, CheckCircle2, Star, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

// Import all app screens
import screen1 from '../assets/images/1.jpeg';
import screen2 from '../assets/images/2.jpeg';
import screen3 from '../assets/images/3.jpeg';
import screen4 from '../assets/images/4.jpeg';
import screen5 from '../assets/images/5.jpeg';
import screen6 from '../assets/images/6.jpeg';
import screen7 from '../assets/images/7.jpeg';
import screen8 from '../assets/images/8.jpeg';
import screen9 from '../assets/images/9.jpeg';
import screen10 from '../assets/images/10.jpeg';
import screen11 from '../assets/images/11.jpeg';
import screen12 from '../assets/images/12.jpeg';

const screens = {
  cliente: [
    { image: screen1, title: "Busca Inteligente", description: "Encontre tudo o que precisa para sua obra." },
    { image: screen2, title: "Listagem de Profissionais", description: "O melhor time da sua região à disposição." },
    { image: screen3, title: "Perfil Detalhado", description: "Veja fotos, avaliações e especialidades." },
    { image: screen4, title: "Chat em Tempo Real", description: "Negocie direto com quem entende do assunto." },
    { image: screen5, title: "Orçamentos Rápidos", description: "Receba propostas sem complicação." },
    { image: screen6, title: "Feed de Inspiração", description: "Ideias reais para o seu projeto." },
  ],
  parceiro: [
    { image: screen7, title: "Painel de Controle", description: "Gerencie sua presença e visibilidade." },
    { image: screen8, title: "Lead Qualificado", description: "Receba contatos de quem quer comprar." },
    { image: screen9, title: "Gestão de Mensagens", description: "Nunca perca uma oportunidade de negócio." },
    { image: screen10, title: "Status da Campanha", description: "Acompanhe seu desempenho em tempo real." },
    { image: screen11, title: "Perfil Profissional", description: "Sua vitrine 24h para toda a cidade." },
    { image: screen12, title: "Notificações de Match", description: "Seja avisado quando um cliente te procurar." },
  ]
};

export default function AppExperience() {
  const [activeTab, setActiveTab] = useState<'cliente' | 'parceiro'>('cliente');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const cardWidth = window.innerWidth < 768 ? 240 + 24 : 280 + 40; // card width + gap
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < screens[activeTab].length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current || index < 0 || index >= screens[activeTab].length) return;
    const cardWidth = window.innerWidth < 768 ? 240 + 24 : 280 + 40; // card width + gap
    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50 overflow-hidden" id="app-experience">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
              <Zap className="w-3.5 h-3.5" fill="currentColor" />
              Tecnologia que vende
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Conheça o app onde sua <span className="text-primary">empresa vai aparecer</span>
            </h2>
            
            <p className="text-lg text-slate-500 mb-8 font-medium">
              Disponível para iOS e Android. Uma plataforma moderna, simples e feita para conectar clientes a serviços e empresas locais.
            </p>

            {/* Platform Badges */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-100 flex-1 max-w-[160px]">
                <Apple className="w-5 h-5 text-slate-900" fill="currentColor" />
                <div className="text-left">
                  <p className="text-[8px] font-bold text-slate-400 uppercase leading-none">Baixe na</p>
                  <p className="text-xs font-black text-slate-900 leading-none mt-0.5">App Store</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-100 flex-1 max-w-[160px]">
                <Smartphone className="w-5 h-5 text-slate-900" />
                <div className="text-left">
                  <p className="text-[8px] font-bold text-slate-400 uppercase leading-none">Disponível no</p>
                  <p className="text-xs font-black text-slate-900 leading-none mt-0.5">Google Play</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="inline-flex p-1.5 bg-slate-200/50 backdrop-blur-sm rounded-[2rem] border border-slate-200">
              <button
                onClick={() => { setActiveTab('cliente'); setActiveIndex(0); scrollToIndex(0); }}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === 'cliente' ? 'bg-white text-primary shadow-lg shadow-slate-200' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Experiência Cliente
              </button>
              <button
                onClick={() => { setActiveTab('parceiro'); setActiveIndex(0); scrollToIndex(0); }}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === 'parceiro' ? 'bg-white text-primary shadow-lg shadow-slate-200' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Ecossistema Parceiro
              </button>
            </div>
          </motion.div>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          {/* Navigation Arrows (Desktop) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 pointer-events-none">
            <div className="container mx-auto px-4 flex justify-between">
              <button 
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="w-14 h-14 bg-white/95 backdrop-blur-xl rounded-full border border-slate-200 flex items-center justify-center shadow-2xl transition-all hover:bg-white disabled:opacity-0 pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6 text-slate-900" />
              </button>
              <button 
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={activeIndex === screens[activeTab].length - 1}
                className="w-14 h-14 bg-white/95 backdrop-blur-xl rounded-full border border-slate-200 flex items-center justify-center shadow-2xl transition-all hover:bg-white disabled:opacity-0 pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6 text-slate-900" />
              </button>
            </div>
          </div>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar py-20 px-8"
            style={{ 
              perspective: '1200px',
              scrollPaddingLeft: '0',
              scrollPaddingRight: '0'
            }}
          >
            <AnimatePresence mode="wait">
              <div className="flex gap-6 md:gap-10 items-end mx-auto" key={activeTab}>
                {screens[activeTab].map((screen, idx) => (
                  <motion.div
                    key={`${activeTab}-${idx}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex-shrink-0 w-[240px] md:w-[280px] snap-center first:ml-[calc(50vw-120px)] last:mr-[calc(50vw-120px)] md:first:ml-0 md:last:mr-0"
                  >
                      <motion.div
                        animate={{
                          scale: activeIndex === idx ? 1.05 : 0.9,
                          opacity: activeIndex === idx ? 1 : 0.6,
                          y: activeIndex === idx ? 0 : 30
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative group"
                      >
                        {/* iPhone Mockup Frame */}
                        <div className="relative w-[240px] h-[480px] md:w-[280px] md:h-[560px] bg-slate-900 rounded-[3rem] p-2 md:p-2.5 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border-[4px] md:border-[6px] border-slate-800 mx-auto">
                          {/* Dynamic Island */}
                          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[60px] h-[18px] bg-slate-900 rounded-full z-40"></div>
                          
                          {/* Screen Content */}
                          <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-white">
                            <img 
                              src={screen.image} 
                              alt={screen.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
