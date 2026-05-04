import React from 'react';
import MainNavbar from '../components/main/MainNavbar';
import ExpansionHero from '../components/expansion/ExpansionHero';
import ExpansionServiceGrid from '../components/expansion/ExpansionServiceGrid';
import ExpansionOpportunityPremium from '../components/expansion/ExpansionOpportunityPremium';
import ExpansionMapSection from '../components/expansion/ExpansionMapSection';
import ExpansionValueProposition from '../components/expansion/ExpansionValueProposition';
import { ExpansionOpportunity, ExpansionHowItWorks } from '../components/expansion/ExpansionOpportunity';
import { ExpansionFeatures, ExpansionEarnings } from '../components/expansion/ExpansionFeatures';
import { ExpansionLeadForm, ExpansionFAQ } from '../components/expansion/ExpansionLeadForm';
import { ExpansionInvestment } from '../components/expansion/ExpansionInvestment';
import { Footer } from '../components/Footer';
import FloatingActions from '../components/FloatingActions';

export default function ExpansionLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainNavbar />
      <main className="flex-grow">
        <ExpansionHero />
        <ExpansionServiceGrid />
        <ExpansionOpportunityPremium />
        <ExpansionMapSection />
        <ExpansionValueProposition />
        <ExpansionOpportunity />
        <ExpansionHowItWorks />
        <ExpansionInvestment />
        <ExpansionFeatures />
        <ExpansionEarnings />
        <ExpansionLeadForm />
        <ExpansionFAQ />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
