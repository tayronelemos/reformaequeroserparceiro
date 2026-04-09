import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ChevronDown, ChevronUp, ShieldCheck, Clock, MessageSquare, CheckCircle2, Sparkles } from 'lucide-react';

export function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const formspreeId = 'mojpzyog';

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error('Erro no envio');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="lead-form" className="py-20 lg:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          {/* Info Side */}
          <div className="flex-1 p-8 md:p-12 lg:p-20 bg-slate-50 border-r border-slate-100">
            <div className="max-w-md mx-auto lg:mx-0">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 md:mb-8 leading-[1] tracking-tight text-center lg:text-left">
                Candidate-se para a <span className="text-primary">sua cidade.</span>
              </h2>
              <p className="text-base md:text-lg text-slate-500 mb-10 md:mb-12 leading-relaxed text-center lg:text-left">
                As vagas são limitadas por território. Preencha o formulário e nossa equipe entrará em contato para validar seu perfil.
              </p>

              <div className="space-y-6 md:space-y-8">
                <div className="flex flex-col sm:flex-row items-center lg:items-start text-center lg:text-left gap-4 md:gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Análise de Perfil</div>
                    <div className="text-sm text-slate-500">Garantimos que apenas os melhores parceiros assumam as cidades.</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center lg:items-start text-center lg:text-left gap-4 md:gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Resposta em 24h</div>
                    <div className="text-sm text-slate-500">Nossa equipe comercial analisa e responde rapidamente.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="flex-1 p-6 md:p-12 lg:p-20 relative">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Send className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Solicitação Enviada!</h3>
                <p className="text-slate-500">Em breve um consultor entrará em contato com você via e-mail ou WhatsApp.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold text-center mb-6"
                  >
                    Ocorreu um erro ao enviar. Por favor, tente novamente ou use o WhatsApp.
                  </motion.div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                    <input
                      required
                      name="nome"
                      type="text"
                      className="w-full px-5 md:px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm md:text-base"
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="w-full px-5 md:px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm md:text-base"
                      placeholder="joao@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">WhatsApp</label>
                    <input
                      required
                      name="whatsapp"
                      type="tel"
                      className="w-full px-5 md:px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm md:text-base"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Cidade de Interesse</label>
                    <input
                      required
                      name="cidade"
                      type="text"
                      className="w-full px-5 md:px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm md:text-base"
                      placeholder="Ex: São Paulo"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Por que quer ser parceiro?</label>
                  <textarea
                    required
                    name="mensagem"
                    rows={4}
                    className="w-full px-5 md:px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm md:text-base"
                    placeholder="Conte-nos um pouco sobre você..."
                  ></textarea>
                </div>

                <button
                  disabled={status === 'loading'}
                  className="w-full py-5 bg-primary text-white font-black text-xs md:text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar Candidatura'}
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Seus dados estão protegidos pela LGPD.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Preciso ter experiência em construção civil?',
      answer: 'Não. O seu papel como parceiro não é executar serviços, e sim gerenciar a operação na sua região. Você será responsável por desenvolver a rede de profissionais e acompanhar a demanda local, enquanto os serviços são realizados pelos profissionais cadastrados na plataforma.'
    },
    {
      question: 'O que exatamente faz um parceiro do Reformaê?',
      answer: 'O parceiro é responsável por desenvolver e acompanhar a operação do Reformaê na sua região. Isso inclui atrair profissionais, acompanhar o crescimento da base de usuários e monitorar a demanda de serviços. Você atua como gestor da operação local, não como prestador de serviço.'
    },
    {
      question: 'Como o parceiro ganha dinheiro?',
      answer: 'O parceiro ganha com base na movimentação da plataforma na sua região. Cada serviço gerado, cada conexão realizada e cada oportunidade criada dentro do sistema contribui para a sua receita. Quanto maior a atividade na sua região, maior o seu potencial de ganho.'
    },
    {
      question: 'Quanto tempo leva para começar a faturar?',
      answer: 'O início pode variar de acordo com a ativação da sua região. Em geral, os primeiros resultados começam a aparecer nos primeiros meses, com potencial de crescimento entre 3 a 6 meses conforme a base de usuários e profissionais aumenta.'
    },
    {
      question: 'Existe exclusividade por região?',
      answer: 'Sim. Trabalhamos com um modelo de operação regional. Cada parceiro atua em uma área específica, o que permite desenvolver o mercado local com mais foco e potencial de crescimento.'
    },
    {
      question: 'Preciso ter equipe ou estrutura física?',
      answer: 'Não. O modelo foi pensado para ser leve e escalável. Você não precisa de escritório, equipe operacional ou estrutura física — toda a operação acontece através da plataforma.'
    },
    {
      question: 'Como funciona a entrada de profissionais na plataforma?',
      answer: 'Os profissionais se cadastram, passam por validação e começam a receber oportunidades de serviços. Você acompanha esse crescimento e pode atuar na expansão da rede na sua região.'
    },
    {
      question: 'O Reformaê já está pronto?',
      answer: 'Estamos na fase final de desenvolvimento, com cerca de 80% da plataforma concluída. O lançamento oficial está previsto para o final de abril. Neste momento, já estamos selecionando e estruturando os parceiros responsáveis por cada região, para que a operação comece de forma organizada e com alto potencial de crescimento desde o início.'
    },
    {
      question: 'Qual o suporte que eu recebo?',
      answer: 'Você terá suporte técnico e acompanhamento durante a sua jornada. O objetivo é garantir que você consiga estruturar e expandir sua operação com segurança.'
    },
    {
      question: 'Existe limite de crescimento?',
      answer: 'Não. O modelo é escalável. Quanto maior a demanda e a rede de profissionais na sua região, maior o seu potencial de faturamento.'
    },
    {
      question: 'Preciso investir em marketing?',
      answer: 'O parceiro pode acelerar o crescimento local com ações estratégicas, mas a plataforma também trabalha para gerar demanda. O crescimento acontece de forma combinada entre tecnologia e expansão da rede.'
    },
    {
      question: 'Por que entrar agora?',
      answer: 'Estamos na fase de expansão regional. Isso significa que os primeiros parceiros têm a oportunidade de construir a base da sua região desde o início, com muito mais espaço para crescimento.'
    },
    {
      question: 'O que acontece se eu não entrar agora?',
      answer: 'Outros parceiros podem assumir a operação da sua região. E quem entra primeiro constrói vantagem competitiva no mercado local.'
    },
    {
      question: 'Esse modelo é parecido com franquia?',
      answer: 'Ele é inspirado em modelos de expansão, mas com uma grande diferença: Você não precisa de estrutura física, equipe ou operação pesada. É um modelo mais leve, digital e escalável.'
    },
    {
      question: 'O Reformaê garante faturamento?',
      answer: 'Não existe garantia de faturamento, pois o resultado depende da ativação da região e da gestão do parceiro. Porém, o modelo foi estruturado para gerar oportunidades reais e escaláveis.'
    },
    {
      question: 'Como faço para começar?',
      answer: 'Basta se candidatar como parceiro. Após análise, você receberá todas as orientações para iniciar a operação na sua região.'
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
              <Sparkles className="w-3 h-3" />
              Dúvidas Frequentes
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tighter">
              Perguntas <span className="text-primary italic">Frequentes</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Tudo o que você precisa saber para se tornar um parceiro estratégico e dominar sua região.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`border rounded-[1.5rem] md:rounded-[2.5rem] transition-all duration-300 ${openIndex === i ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/5' : 'border-slate-100 bg-slate-50 hovre:bg-slate-100'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 xl:p-10 text-left"
                >
                  <span className="text-base md:text-xl font-bold text-slate-900 leading-tight pr-4">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-primary text-white rotate-180' : 'bg-white text-slate-300 border border-slate-100'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-6 md:px-10 pb-8 md:pb-10 text-sm md:text-lg text-slate-500 leading-relaxed font-normal"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Premium CTA Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center px-2"
          >
            <div className="inline-block p-[1px] rounded-[2rem] md:rounded-[3rem] bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 shadow-2xl shadow-primary/20">
              <div className="bg-white/80 backdrop-blur-xl rounded-[1.9rem] md:rounded-[2.9rem] p-8 md:p-16 border border-white/50">
                <h4 className="text-xl md:text-3xl font-black text-slate-900 mb-4 tracking-tighter">Ainda tem dúvidas?</h4>
                <p className="text-sm md:text-lg text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
                  Nossos consultores estão prontos para te explicar cada detalhe do modelo de parceria.
                </p>
                <a 
                  href="https://wa.me/5583999610819?text=Olá,%20tenho%20uma%20dúvida%20sobre%20a%20parceria%20do%20Reformaê."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 bg-primary text-white font-black text-sm md:text-lg rounded-2xl md:rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(26,111,232,0.4)] hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-6 h-6 md:w-7 md:h-7 fill-current group-hover:rotate-12 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar com um consultor
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
}
