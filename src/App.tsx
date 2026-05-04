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

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate', handleLocationChange);
    window.addEventListener('replacestate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
      window.removeEventListener('replacestate', handleLocationChange);
    };
  }, []);

  // Scroll to top on route change, or scroll to hash section if present
  useEffect(() => {
    const hash = window.location.hash; // e.g. "#app", "#faq"

    if (hash) {
      // Aguarda a página renderizar antes de rolar para a seção
      const tryScroll = (attempts = 0) => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 150);
        }
      };
      setTimeout(() => tryScroll(), 100);
    } else {
      // Sem hash: vai pro topo instantaneamente
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [currentPath]);

  // Intercepta cliques em <a> para SPA navigation
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href && anchor.origin === window.location.origin) {
        const path = anchor.pathname;
        const hash = anchor.hash;

        // Âncora na mesma página: deixa o browser / navbar tratarem
        if (path === window.location.pathname && hash) {
          return;
        }

        // Navegação para outra página (com ou sem hash)
        if (path !== window.location.pathname) {
          e.preventDefault();
          const fullPath = hash ? `${path}${hash}` : path;
          window.history.pushState({}, '', fullPath);
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
