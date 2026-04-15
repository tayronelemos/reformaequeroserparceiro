import Hero from '../components/Hero';
import ProfessionalSection from '../components/ProfessionalSection';
import AppExperience from '../components/AppExperience';
import ServiceGrid from '../components/ServiceGrid';
import IntentSection from '../components/IntentSection';
import BenefitsGrid from '../components/BenefitsGrid';
import LocalProof from '../components/LocalProof';
import AppDifferential from './../components/AppDifferential';
import AppShowcase from '../components/AppShowcase';
import PricingSection from '../components/PricingSection';
import TargetAudience from '../components/TargetAudience';
import { FAQ, LeadForm } from '../components/LeadForm';
import { Navbar, Footer } from '../components/Footer';
import FloatingActions from '../components/FloatingActions';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* 1. HERO - Manter estrutura ajustada */}
        <Hero />

        {/* NEW: PROFISSIONAIS IMAGE - Largura Total com Badges */}
        <ProfessionalSection />
        
        {/* NEW: APP EXPERIENCE - Visibilidade e Confiança Imediata */}
        <AppExperience />
        
        {/* 2. SEÇÃO SERVIÇOS - Manter estrutura ajustada */}
        <ServiceGrid />
        
        {/* 3. OPORTUNIDADE REAL - Momento exato da decisão */}
        <IntentSection />
        
        {/* 4. COMO O PARCEIRO GANHA - 6 Cards de Benefícios */}
        <BenefitsGrid />
        
        {/* 5. PROVA LOCAL - João Pessoa + Métricas + Comparativo */}
        <LocalProof />
        
        {/* 6. DIFERENCIAL DO APP - Ambiente de Negócios vs Rede Social */}
        <AppDifferential />

        {/* 7. SHOWCASE DO APP - Visibilidade e Oportunidades Reais */}
        <AppShowcase />
        
        {/* 7 & 8. INVESTIMENTO E ESCASSEZ - Preço Único e Vagas Limitadas */}
        <PricingSection />
        
        {/* 9. PARA QUEM É - Segmentos Alvo e CTA Robusto */}
        <TargetAudience />
        
        {/* FAQ & FORMULÁRIO FINAL */}
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
