/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Hero from './components/Hero';
import ServiceGrid from './components/ServiceGrid';
import OpportunityPremium from './components/OpportunityPremium';
import MapSection from './components/MapSection';
import ValueProposition from './components/ValueProposition';
import { Opportunity, HowItWorks } from './components/Opportunity';
import { Features, Earnings } from './components/Features';
import { FAQ, LeadForm } from './components/LeadForm';
import PartnershipSection from './components/PartnershipSection';
import { Navbar, Footer, FinalCTA } from './components/Footer';
import FloatingActions from './components/FloatingActions';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ServiceGrid />
        <OpportunityPremium />
        <MapSection />
        <ValueProposition />
        <Opportunity />
        <HowItWorks />
        <Features />
        <Earnings />
        <PartnershipSection />
        <FAQ />
        <LeadForm />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
