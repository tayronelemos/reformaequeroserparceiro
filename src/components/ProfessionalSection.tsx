import React from 'react';
import { motion } from 'motion/react';
import profissionaisImg from '../assets/images/profissionais.png';

const floatingBadges = [
  { name: 'Diarista', top: '25%', left: '12%' },
  { name: 'Eletricista', top: '18%', left: '26%' },
  { name: 'Pintor', top: '12%', left: '46%' },
  { name: 'Jardineiro', top: '22%', left: '60%' },
  { name: 'Obras', top: '15%', left: '82%' },
];

export default function ProfessionalSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white border-y border-slate-100">
      <div className="relative w-full aspect-[21/9] md:aspect-auto">
        <img 
          src={profissionaisImg} 
          alt="Profissionais Reformaê" 
          className="w-full h-auto object-cover min-h-[400px]"
        />
        
        {/* Floating Badges Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingBadges.map((badge, index) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "linear"
              }}
              style={{ top: badge.top, left: badge.left }}
              className="absolute hidden md:block"
            >
              <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl shadow-slate-900/10 border border-white flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{badge.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Floating Tags - Bottom stack */}
        <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 px-4 w-full">
          {floatingBadges.map((badge) => (
            <span key={badge.name} className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg border border-white text-[10px] font-black text-slate-900 uppercase tracking-wider">
              {badge.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
