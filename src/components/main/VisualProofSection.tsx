import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Users, MapPin } from 'lucide-react';
import fotoSessao from '../../assets/images/foto-sessao.png';

export default function VisualProofSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[3rem] overflow-hidden relative">
              <img 
                src={fotoSessao} 
                alt="Profissionais Reformaê" 
                className="w-full h-auto object-cover"
              />
              {/* Gradient overlay removed for clean look */}
              
              {/* Overlay Badges */}
              <div className="absolute bottom-10 left-10 right-10 flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-slate-900/90 backdrop-blur-md rounded-full text-white text-sm font-bold flex items-center gap-2 border border-white/10 shadow-2xl">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  Profissionais Verificados
                </div>
                <div className="px-4 py-2 bg-slate-900/90 backdrop-blur-md rounded-full text-white text-sm font-bold flex items-center gap-2 border border-white/10 shadow-2xl">
                  <MapPin className="w-4 h-4 text-primary" />
                  Expansão Nacional
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
                Todos os profissionais que sua região precisa, <span className="text-primary">em um só lugar.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Do pequeno reparo até grandes obras. O Reformaê conecta pessoas a profissionais verificados prontos para executar. Nossa plataforma garante que você encontre a pessoa certa, no momento certo, com a confiança que seu lar merece.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 items-start">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Comunidade Ativa</h4>
                    <p className="text-sm text-slate-600">Milhares de profissionais já utilizam o app para encontrar novos clientes todos os dias.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 items-start">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Segurança em Primeiro Lugar</h4>
                    <p className="text-sm text-slate-600">Sistema de avaliações e checagem de antecedentes para sua total tranquilidade.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
