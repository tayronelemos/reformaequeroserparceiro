import React from 'react';
import ProfessionalHero from '../components/professional/ProfessionalHero';
import ProfessionalSection from '../components/ProfessionalSection';
import ProfessionalSteps from '../components/professional/ProfessionalSteps';
import ProfessionalBenefits from '../components/professional/ProfessionalBenefits';
import ProfessionalForm from '../components/professional/ProfessionalForm';
import { Navbar, Footer } from '../components/Footer';

export default function ProfessionalLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <ProfessionalHero />
        
        {/* NEW: PROFISSIONAIS IMAGE - Largura Total com Badges */}
        <ProfessionalSection />

        <ProfessionalSteps />
        <ProfessionalBenefits />
        <ProfessionalForm />
      </main>
      <Footer />
    </div>
  );
}
