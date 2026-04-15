import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "O que é o Reformaê?",
    a: "O Reformaê é uma plataforma que conecta clientes a profissionais e empresas de serviços na sua região.\n\nAtravés do app, clientes encontram quem precisam para resolver serviços, profissionais recebem pedidos reais todos os dias e empresas ganham visibilidade para gerar novos clientes.\n\nAlém disso, o Reformaê também permite parcerias locais e expansão para novas cidades, criando um ecossistema completo de oportunidades."
  },
  {
    q: "Como funciona para clientes?",
    a: "O cliente descreve o serviço que precisa e, em poucos minutos, profissionais da região começam a enviar orçamentos.\n\nVocê pode comparar perfis, avaliações e escolher com quem deseja fechar — tudo direto pelo celular, de forma rápida e sem burocracia."
  },
  {
    q: "Como funciona para profissionais?",
    a: "Os profissionais recebem pedidos reais de clientes próximos e podem enviar orçamentos diretamente pelo app.\n\nPara acessar os contatos dos clientes e enviar propostas, o profissional utiliza créditos dentro da plataforma.\n\nIsso garante que apenas profissionais realmente interessados entrem em contato, mantendo a qualidade da demanda."
  },
  {
    q: "Preciso pagar para usar?",
    a: "Para clientes: não. Você pode solicitar serviços gratuitamente.\n\nPara profissionais: sim. O acesso aos contatos dos clientes e envio de orçamentos funciona através de créditos dentro do app.\n\nPara empresas/parceiros: existe um modelo de parceria para divulgação, geração de demanda e presença dentro da plataforma."
  },
  {
    q: "Como os profissionais são verificados?",
    a: "Os profissionais passam por um processo de validação dentro da plataforma.\n\nAlém disso, o sistema de avaliações dos clientes ajuda a manter a qualidade, destacando os melhores profissionais e criando um ambiente mais seguro para todos."
  },
  {
    q: "O app já está disponível?",
    a: "O Reformaê está em fase final de lançamento.\n\nEstamos liberando o acesso por regiões, e por isso já estamos formando a base de profissionais, empresas e parceiros antes da abertura oficial."
  },
  {
    q: "Como posso ganhar dinheiro com o app?",
    a: "Existem três formas principais:\n\n👉 Como profissional: Recebendo pedidos de clientes e fechando serviços.\n\n👉 Como empresa/parceiro: Ganhando visibilidade, gerando demanda e captando novos clientes.\n\n👉 Como representante (expansão): Levando o Reformaê para sua cidade e participando do crescimento da plataforma."
  },
  {
    q: "Empresas podem anunciar?",
    a: "Sim.\n\nEmpresas podem entrar como parceiras dentro do Reformaê e aparecer diretamente para clientes que já estão buscando serviços.\n\nAlém disso, existem formatos como:\n• Destaque dentro do app\n• Divulgação local\n• Campanhas e promoções\n\nTudo focado em gerar demanda real."
  },
  {
    q: "É seguro contratar?",
    a: "Sim.\n\nO Reformaê conta com sistema de avaliações, perfis verificados e histórico de serviços, permitindo que você escolha profissionais com mais confiança.\n\nVocê tem total controle sobre com quem deseja contratar."
  },
  {
    q: "Em quais cidades o Reformaê funciona?",
    a: "O Reformaê está sendo lançado inicialmente por regiões específicas e será expandido gradualmente.\n\nSe sua cidade ainda não estiver disponível, você pode entrar na lista ou até mesmo se tornar um representante local."
  },
  {
    q: "Como funciona a parceria com o Reformaê?",
    a: "Empresas podem se tornar parceiras para ter presença dentro do app e captar clientes da sua região.\n\nA parceria inclui visibilidade, geração de demanda e acesso a uma base crescente de usuários.\n\nAs vagas são limitadas por cidade e segmento."
  },
  {
    q: "Posso garantir minha vaga antes do lançamento?",
    a: "Sim.\n\nEstamos liberando vagas antecipadas para profissionais, empresas e parceiros estratégicos.\n\nEntrar agora significa sair na frente quando o app for liberado na sua região."
  },
];

export default function MainFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Perguntas Frequentes</h2>
          <p className="text-lg text-slate-600">Tudo o que você precisa saber sobre o ecossistema Reformaê.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-primary/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 group"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === idx ? 'text-primary' : 'text-slate-900'}`}>
                  {faq.q}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${openIndex === idx ? 'bg-primary border-primary text-white rotate-180' : 'border-slate-100 text-slate-400 group-hover:border-primary/30'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4 whitespace-pre-line">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-primary rounded-[2.5rem] text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Ainda tem dúvidas?</h3>
            <p className="mb-8 text-primary-light">Nossa equipe de suporte está pronta para te ajudar via WhatsApp.</p>
            <a
              href="https://wa.me/5583999610819"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-lg"
            >
              Falar com Suporte
            </a>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
