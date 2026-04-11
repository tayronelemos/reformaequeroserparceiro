import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Instagram, Facebook, Linkedin, Mail, Sparkles, MessageCircle, ChevronDown, Menu, X } from 'lucide-react';
import logoClaro from '../assets/images/logo-claro.png';
import logoCriativos from '../assets/images/criativosbrasil.png';

export function FinalCTA() {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="w-3 h-3" />
              Vagas Limitadas
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
              Sua cidade pode ser a próxima — <span className="text-primary italic">aja agora.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Estamos liberando poucas cidades por vez para garantir o sucesso de cada parceiro. Não deixe sua região para a concorrência.
            </p>
            <button 
              onClick={scrollToForm}
              className="px-12 py-6 bg-white text-slate-900 font-black text-lg rounded-[2rem] shadow-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 mx-auto group"
            >
              Garantir minha exclusividade
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-white text-slate-900 py-24 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-8">
              <img src={logoClaro} alt="Reformaê" className="h-10 w-auto" />
            </div>
            <p className="text-slate-500 max-w-sm mb-10 text-lg leading-relaxed">
              A maior plataforma de conexão inteligente para o mercado de construção civil e reformas do Brasil.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-100">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">Navegação</h4>
            <ul className="space-y-4 font-bold text-slate-600">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/trabalhe-conosco" className="hover:text-primary transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#app-experience" className="hover:text-primary transition-colors">O App</a></li>
              <li><a href="#oportunidade" className="hover:text-primary transition-colors">Oportunidade</a></li>
              <li><a href="#joao-pessoa" className="hover:text-primary transition-colors">João Pessoa</a></li>
              <li><a href="#planos" className="hover:text-primary transition-colors">Planos de Investimento</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">Contato</h4>
            <ul className="space-y-6">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 text-center md:text-left">E-mail</div>
                  <div className="font-bold text-slate-900 break-all md:break-normal">parceriareformae@gmail.com</div>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 text-center md:text-left">WhatsApp</div>
                  <a href="https://wa.me/5583999610819" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 hover:text-primary transition-colors">+55 83 99961-0819</a>
                </div>
              </li>
              <li className="text-sm font-bold text-slate-500 text-center md:text-left pt-4">
                Suporte dedicado para nossos <br className="md:hidden" /> parceiros estratégicos.
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center md:text-left">
          <p>© 2026 Reformaê. Todos os direitos reservados®.</p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-[10px]">Desenvolvido por:</span>
            <a href="https://criativosbrasil.com.br" target="_blank" rel="noopener noreferrer">
              <img src={logoCriativos} alt="Criativos Brasil" className="h-8 w-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setIsMobileMenuOpen(false);
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Normal navigation for page routes
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems: { label: string; href: string; dropdown?: { label: string; href: string }[] }[] = [
    { label: 'Home', href: '/' },
    { label: 'O App', href: '#app-experience' },
    { label: 'Oportunidade', href: '#oportunidade' },
    { label: 'João Pessoa', href: '#joao-pessoa' },
    { label: 'Planos', href: '#planos' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2 md:py-4' : 'py-4 md:py-8'}`}>
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between px-4 md:px-8 h-16 md:h-20 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 border ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border-slate-100 shadow-2xl shadow-slate-200/50' 
            : 'bg-white border-transparent'
        }`}>
          <div className="flex items-center">
            <img src={logoClaro} alt="Reformaê" className="h-6 md:h-8 w-auto" />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10 h-full">
            {menuItems.map((item) => (
              <div 
                key={item.label} 
                className="relative group h-full flex items-center"
                onMouseEnter={() => item.dropdown && setIsDropdownOpen(true)}
                onMouseLeave={() => item.dropdown && setIsDropdownOpen(false)}
              >
                <a 
                  href={item.href || '#'} 
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors h-full py-2"
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />}
                </a>

                {item.dropdown && isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-[80%] left-1/2 -translate-x-1/2 w-56 pt-6 z-50"
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 py-4 overflow-hidden">
                      {item.dropdown.map((subItem) => (
                        <a 
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary hover:bg-slate-50 transition-all"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden sm:block px-6 md:px-8 py-2.5 md:py-3.5 bg-slate-900 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-xl md:rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
              Quero ser parceiro
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-900 transition-colors z-[60]"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    <a 
                      href={item.href || '#'} 
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="flex items-center justify-between text-xs font-black uppercase tracking-[0.2em] text-slate-900 py-2 cursor-pointer"
                    >
                      {item.label}
                    </a>
                    {item.dropdown && (
                      <div className="mt-2 ml-4 space-y-2 border-l-2 border-slate-100 pl-4">
                        {item.dropdown.map((sub) => (
                          <a 
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 py-1"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 mt-4"
                >
                  Quero ser parceiro
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
