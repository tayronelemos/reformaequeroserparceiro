/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import PartnerLanding from './pages/PartnerLanding';
import ExpansionLanding from './pages/ExpansionLanding';
import ProfessionalLanding from './pages/ProfessionalLanding';
import AdminDashboard from './pages/AdminDashboard';
import WhatsAppBridge from './pages/WhatsAppBridge';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for back/forward buttons
    window.addEventListener('popstate', handleLocationChange);
    
    // Listen for custom navigation events
    window.addEventListener('pushstate', handleLocationChange);
    window.addEventListener('replacestate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
      window.removeEventListener('replacestate', handleLocationChange);
    };
  }, []);

  // Scroll to top on route change — use 'instant' so the page never appears mid-scroll
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentPath]);

  // Simple interceptor for <a> tags to enable SPA navigation
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href && anchor.origin === window.location.origin) {
        const path = anchor.pathname;
        const hash = anchor.hash;
        
        // If it's just an anchor link on the same page, let it be handled by browser/Footer.tsx
        if (path === window.location.pathname && hash) {
          return;
        }

        // If it's a different page, intercept
        if (path !== window.location.pathname) {
          e.preventDefault();
          window.history.pushState({}, '', path);
          window.dispatchEvent(new Event('pushstate'));
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Routing Logic
  const renderPage = () => {
    switch (currentPath) {
      case '/parceiros':
      case '/parceiros/':
        return <PartnerLanding />;
      case '/expansao':
      case '/expansao/':
        return <ExpansionLanding />;
      case '/trabalhe-conosco':
      case '/trabalhe-conosco/':
        return <ProfessionalLanding />;
      case '/admin':
      case '/admin/':
      case '/admin/profissionais':
      case '/admin/profissionais/':
        return <AdminDashboard />;
      case '/convite':
      case '/convite/':
        return <WhatsAppBridge />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
}
