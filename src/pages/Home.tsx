import React from 'react';
import MainNavbar from '../components/main/MainNavbar';
import MainHero from '../components/main/MainHero';
import MainSteps from '../components/main/MainSteps';
import MainServices from '../components/main/MainServices';
import MainAppShowcase from '../components/main/MainAppShowcase';
import VisualProofSection from '../components/main/VisualProofSection';
import ValueAndSegmentation from '../components/main/ValueAndSegmentation';
import MainExpansion from '../components/main/MainExpansion';
import MainFAQ from '../components/main/MainFAQ';
import { Footer } from '../components/Footer';
import FloatingActions from '../components/FloatingActions';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainNavbar />
      <main className="flex-grow">
        <MainHero />
        <VisualProofSection />
        <MainSteps />
        <MainAppShowcase />
        <MainServices />
        <ValueAndSegmentation />
        <MainExpansion />
        <MainFAQ />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
