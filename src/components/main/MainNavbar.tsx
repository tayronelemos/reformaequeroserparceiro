import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import logoClaro from '../../assets/images/logo-claro.png';

export default function MainNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'O App', href: '#app' },
    { label: 'Serviços', href: '#services' },
    { label: 'Oportunidade', href: '#oportunidade' },
    { label: 'Expansão', href: '#expansao' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2 md:py-4' : 'py-4 md:py-8'}`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between px-4 md:px-8 h-16 md:h-20 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 border ${
            isScrolled
              ? 'bg-white/90 backdrop-blur-xl border-slate-100 shadow-2xl shadow-slate-200/50'
              : 'bg-white border-transparent'
          }`}>

            {/* Logo */}
            <a href="/" className="flex items-center">
              <img src={logoClaro} alt="Reformaê" className="h-6 md:h-8 w-auto" />
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-10 h-full">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors h-full py-2"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-2 md:gap-4">
              <a
                href="/parceiros"
                className="hidden sm:block px-6 md:px-8 py-2.5 md:py-3.5 bg-slate-900 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-xl md:rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                Quero ser parceiro
              </a>

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

          {/* Mobile Drawer */}
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
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between text-xs font-black uppercase tracking-[0.2em] text-slate-900 py-2 border-b border-slate-50 last:border-0"
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="/parceiros"
                    className="w-full py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 mt-4 flex items-center justify-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Quero ser parceiro
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
