import React from 'react';
import { motion } from 'motion/react';
import { FastForward, Calculator, MapPin, LayoutDashboard, ShieldCheck, Star, Clock, Lock, Coins, Megaphone, Bell, Rocket } from 'lucide-react';

export default function ExpansionValueProposition() {
  return (
    <>
      {/* 1. DEMANDA (Light & Premium Grid) */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] opacity-60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 rounded-full border border-primary/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Alta Demanda
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]"
            >
              Um problema real que nunca foi <span className="text-primary">resolvido direito</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 leading-relaxed font-medium"
            >
              Encontrar um bom profissional na sua região ainda é difícil, demorado e inseguro. O Reformaê resolve isso de forma simples, rápida e confiável.
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6 text-lg text-slate-600 leading-relaxed"
            >
              <p>
                Hoje, quando alguém precisa de um serviço — seja um pedreiro, pintor, eletricista ou diarista — o processo é sempre o mesmo:
              </p>
              <p className="font-semibold text-slate-900 text-xl border-l-4 border-primary pl-6 py-2 bg-blue-50/50 rounded-r-2xl">
                Indicação incerta, demora na resposta, falta de confiança e dificuldade para comparar opções.
              </p>
              <p>
                O Reformaê elimina <strong className="text-slate-900">completamente</strong> esse problema.
              </p>
              <p>
                O cliente descreve o que precisa, envia fotos e em poucos minutos começa a receber orçamentos de profissionais próximos, já cadastrados na plataforma. Tudo em um único lugar.
              </p>
              <p className="inline-block bg-slate-900 text-white font-bold px-6 py-3 rounded-xl mt-4 shadow-lg shadow-slate-900/20">
                Sem procurar. Sem perder tempo. Sem depender de indicação.
              </p>
            </motion.div>

            <div className="flex-1 grid sm:grid-cols-2 gap-6">
              {[
                { icon: FastForward, title: "Praticidade imediata", desc: "O cliente publica o pedido em minutos e recebe respostas rapidamente." },
                { icon: Calculator, title: "Comparação inteligente", desc: "Avalia preço, prazo e reputação antes de decidir quem contratar." },
                { icon: MapPin, title: "Profissionais próximos", desc: "Sistema prioriza quem está na região, aumentando velocidade e eficiência." },
                { icon: LayoutDashboard, title: "Acompanhamento completo", desc: "Todo o processo acontece dentro do app, do pedido à finalização." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all"
                >
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-5">
                    <item.icon size={24} strokeWidth={2} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[32px] border border-blue-100"
          >
            <h4 className="text-2xl font-bold text-slate-900 mb-2">Quanto mais pessoas descobrem essa facilidade, mais a demanda cresce.</h4>
            <p className="text-xl text-primary font-bold">E essa demanda precisa ser atendida na sua cidade.</p>
          </motion.div>
        </div>
      </section>

      {/* 2. SEGURANÇA (Dark & Premium Focus) */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Glows and dark styling */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full border border-primary/20"
            >
              Plataforma Blindada
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]"
            >
              Segurança e confiança em cada <span className="text-primary">conexão</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 leading-relaxed font-medium"
            >
              Não é apenas sobre conectar. É sobre garantir que a conexão seja confiável.
            </motion.p>
          </div>

          <div className="flex flex-col gap-16 mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed"
            >
              <p>
                Diferente de plataformas informais, grupos de WhatsApp ou redes sociais, o Reformaê trabalha com controle de qualidade e verificação.
              </p>
              <div className="inline-block w-full max-w-3xl text-left font-semibold text-white text-xl border border-slate-700/50 p-6 md:p-8 bg-slate-800/30 rounded-[24px] shadow-xl shadow-black/20 my-4 relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary group-hover:w-2 transition-all"></div>
                Para enviar orçamentos ou entrar em contato com os clientes, o profissional precisa estar <span className="text-primary">validado dentro da plataforma.</span>
              </div>
              <p>
                Isso cria um ambiente higienizado e muito mais seguro para todos os envolvidos, expulsando amadores e valorizando os bons prestadores.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: ShieldCheck, title: "Profissionais verificados", desc: "Cadastro validado rigorosamente antes de interagir com clientes na plataforma." },
                { icon: Star, title: "Sistema de avaliações", desc: "Cada profissional é avaliado após o serviço, criando uma reputação real baseada em qualidade." },
                { icon: Clock, title: "Histórico transparente", desc: "Clientes podem ver todas as experiências e avaliações antes de contratar." },
                { icon: Lock, title: "Comunicação protegida", desc: "O chat e os acordos acontecem dentro do app, sem exposição inicial de dados pessoais." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-md p-8 rounded-[32px] border border-slate-700 hover:bg-slate-800 hover:-translate-y-2 transition-all duration-300 flex flex-col"
                >
                  <div className="w-14 h-14 bg-slate-900 border border-slate-700 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(26,111,232,0.3)]">
                    <item.icon size={28} strokeWidth={2} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center p-8 bg-slate-800/50 backdrop-blur-xl rounded-[32px] border border-slate-700"
          >
            <h4 className="text-2xl font-bold text-white mb-2">Quanto maior a confiança, maior a conversão.</h4>
            <p className="text-xl text-primary font-bold">E quanto maior a conversão, maior o volume de serviços na sua cidade.</p>
          </motion.div>
        </div>
      </section>

      {/* 3. MONETIZAÇÃO (Premium Business Model) */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 rounded-full border border-emerald-100"
            >
              Fontes de Receita
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]"
            >
              Um modelo pensado <br className="hidden md:block"/> para <span className="text-emerald-500">escalar</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto mb-10"
            >
              O Reformaê não depende de uma única fonte de receita. Ele foi estruturado para gerar múltiplas formas de monetização dentro da mesma cidade.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 inline-block font-semibold text-slate-700 max-w-3xl"
            >
              Enquanto a demanda cresce, o modelo financeiro acompanha. Cada nova solicitação, novo profissional e interação contribui para um ecossistema que <strong className="text-emerald-500">gera receita de forma contínua.</strong>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-7xl mx-auto">
            {[
              { icon: Coins, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100", title: "Moedas e créditos dos profissionais", desc: "Profissionais utilizam créditos comprados para acessar contatos de clientes e enviar orçamentos, gerando receita recorrente." },
              { icon: Megaphone, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100", title: "Espaços para anúncios locais", desc: "Empresas particulares e empreendimentos podem anunciar diretamente no app, alcançando um público altamente qualificado na região." },
              { icon: Bell, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-100", title: "Notificações promocionais", desc: "Disparos de campanhas e promoções locais com alto impacto visual e taxas brutais de conversão e abertura." },
              { icon: Rocket, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100", title: "Destaque de profissionais", desc: "Profissionais podem pagar para impulsionar seus perfis no topo das buscas para ganhar muito mais visibilidade no app." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-transform duration-300 flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} ${item.border} border flex items-center justify-center mb-6`}>
                  <item.icon size={28} strokeWidth={2} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* 4. OPERAÇÃO DIGITAL (Full Width Premium) */}
        <div className="mt-32 bg-slate-900 py-32 lg:py-48 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.1),transparent_70%)]"></div>
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto text-center"
            >
              <h3 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-[ -0.04em] leading-[0.95]">
                Não é apenas um app.<br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-blue-400">
                  É uma operação digital completa.
                </span>
              </h3>
              <p className="text-xl md:text-2xl text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
                Com múltiplas fontes de receita acontecendo de forma simultânea e inteligente, concentradas exclusivamente na sua cidade.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="bg-slate-900/50 p-10 md:p-14 text-left">
                  <p className="text-emerald-400 font-black text-lg mb-4 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Escalabilidade Regional
                  </p>
                  <p className="text-white text-xl md:text-2xl font-bold leading-tight">
                    Quanto mais a plataforma cresce na sua região, mais essas fontes de receita se intensificam.
                  </p>
                </div>
                <div className="bg-slate-900/80 p-10 md:p-14 text-left flex flex-col justify-center">
                  <p className="text-slate-400 font-bold text-lg mb-4">Seu Posicionamento</p>
                  <p className="text-emerald-400 font-extrabold text-2xl md:text-3xl leading-tight">
                    Você participa diretamente de cada transação desse crescimento.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
