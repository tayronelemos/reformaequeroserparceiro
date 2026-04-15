import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Smartphone, User, HardHat, Sparkles } from 'lucide-react';

// Import images from the unified assets folder
import client1 from '../../assets/images/1.jpeg';
import client2 from '../../assets/images/2.jpeg';
import client3 from '../../assets/images/3.jpeg';
import client4 from '../../assets/images/4.jpeg';
import client5 from '../../assets/images/5.jpeg';
import client6 from '../../assets/images/6.jpeg';

import pro1 from '../../assets/images/7.jpeg';
import pro2 from '../../assets/images/8.jpeg';
import pro3 from '../../assets/images/9.jpeg';
import pro4 from '../../assets/images/10.jpeg';
import pro5 from '../../assets/images/11.jpeg';
import pro6 from '../../assets/images/12.jpeg';

const CLIENT_SCREENS = [
  { img: client1, title: 'Busca Intuitiva' },
  { img: client2, title: 'Detalhes do Serviço' },
  { img: client3, title: 'Chat Integrado' },
  { img: client4, title: 'Acompanhamento' },
  { img: client5, title: 'Avaliação' },
  { img: client6, title: 'Pagamento Seguro' },
];

const PRO_SCREENS = [
  { img: pro1, title: 'Feed de Oportunidades' },
  { img: pro2, title: 'Gestão de Orçamentos' },
  { img: pro3, title: 'Agenda Inteligente' },
  { img: pro4, title: 'Portfólio' },
  { img: pro5, title: 'Métricas de Ganho' },
  { img: pro6, title: 'Suporte Premium' },
];

export default function ExpansionAppShowcase() {
  const [activeTab, setActiveTab] = useState<'client' | 'pro'>('client');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const screens = activeTab === 'client' ? CLIENT_SCREENS : PRO_SCREENS;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10"
          >
            <Sparkles className="w-3 h-3" />
            Experiência Navegável
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-[0.95]">
            Sua ferramenta de <span className="text-primary italic">alta performance</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
            Explore as telas que os usuários e profissionais da sua cidade utilizarão diariamente. Uma interface premium feita para converter.
          </p>

          {/* Segmented Control */}
          <div className="inline-flex p-1.5 bg-slate-100 rounded-[2rem] border border-slate-200 shadow-sm relative mb-12">
            <button
              onClick={() => setActiveTab('client')}
              className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === 'client' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <User className="w-4 h-4" />
              Área do Cliente
            </button>
            <button
              onClick={() => setActiveTab('pro')}
              className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === 'pro' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <HardHat className="w-4 h-4" />
              Painel Profissional
            </button>
            <motion.div
              layoutId="tab-bg-expansion"
              className="absolute inset-y-1.5 bg-slate-900 shadow-lg"
              initial={false}
              animate={{
                left: activeTab === 'client' ? '6px' : 'calc(50% + 2px)',
                width: 'calc(50% - 8px)',
                borderRadius: '9999px',
              }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 -left-4 xl:-left-12 flex items-center z-20 pointer-events-none md:group-hover:opacity-100 md:opacity-0 transition-opacity">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary hover:scale-110 active:scale-95 transition-all pointer-events-auto"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute inset-y-0 -right-4 xl:-right-12 flex items-center z-20 pointer-events-none md:group-hover:opacity-100 md:opacity-0 transition-opacity">
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary hover:scale-110 active:scale-95 transition-all pointer-events-auto"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Scrollable Area */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="wait">
              {screens.map((screen, index) => (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex-shrink-0 w-[260px] md:w-[280px] snap-center"
                >
                  <div className="relative aspect-[9/19.5] rounded-[2.5rem] bg-slate-900 p-2.5 shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden group/item">
                    {/* Mockup Frame */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-2xl z-20" />
                    <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white">
                      <img 
                        src={screen.img} 
                        alt={screen.title}
                        className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Hint */}
        <div className="flex justify-center gap-1.5 mt-4">
          <div className="w-8 h-1 bg-primary rounded-full" />
          <div className="w-2 h-1 bg-slate-200 rounded-full" />
          <div className="w-2 h-1 bg-slate-200 rounded-full" />
        </div>
        <p className="text-center text-slate-400 text-xs font-medium uppercase tracking-[0.2em] mt-8 flex items-center justify-center gap-2">
          <Smartphone className="w-3 h-3" />
          Arraste para explorar
        </p>
      </div>
    </section>
  );
}
