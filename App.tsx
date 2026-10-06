import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ProblemSection from './components/ProblemSection';
import SolutionProcess from './components/SolutionProcess';
import SmartDiagnosisSection from './components/SmartDiagnosisSection';
import ServicesSection from './components/ServicesSection';
import RatExplainerSection from './components/RatExplainerSection';
import LeyExplainerSection from './components/LeyExplainerSection';
import WhyUsSection from './components/WhyUsSection';
import FaqSection from './components/FaqSection';
import FinalCtaSection from './components/FinalCtaSection';
import TimelineVigencia from './components/TimelineVigencia';
import ComplianceChecklist from './components/ComplianceChecklist';
import Features from './components/Features';
import RatAgentWizard from './components/RatAgentWizard';
import UTMCalculator from './components/UTMCalculator';
import ArcoManager from './components/ArcoManager';
import LabSection from './components/LabSection';
import LegalArticlesGuide from './components/LegalArticlesGuide';
import BlogSection from './components/BlogSection';
import FloatingNav from './components/FloatingNav';
import AIAssistantModal from './components/AIAssistantModal';
import Footer from './components/Footer';
import { PageId } from './types';

const VALID_PAGES: PageId[] = [
  'inicio',
  'ley-21719',
  'agente-rat',
  'derechos-arcop',
  'multas-utm',
  'test-cumplimiento',
  'casos-pymes',
  'guias-recursos',
  'compendio-legal',
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace(/^#\/?/, '') as PageId;
    return VALID_PAGES.includes(hash) ? hash : 'inicio';
  });

  const [isAiOpen, setIsAiOpen] = useState(false);

  // Sync hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '') as PageId;
      if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
      } else if (!window.location.hash || window.location.hash === '#/' || window.location.hash === '#') {
        setCurrentPage('inicio');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const pageNames: Record<PageId, { title: string; subtitle: string }> = {
    'inicio': { 
      title: 'Portal Ley de Protección de Datos Personales Chile', 
      subtitle: 'Cumplimiento oficial Ley 21.719 y Agente RAT con IA' 
    },
    'ley-21719': { 
      title: 'La Ley 21.719 & Calendario de Vigencia', 
      subtitle: 'Plazos legales, vacancia de 24 meses e instalación de la APDP' 
    },
    'agente-rat': { 
      title: 'Agente de IA para el Registro RAT (Art. 14 ter)', 
      subtitle: 'Entrevista de 3 minutos para generar la Ficha Oficial para la APDP' 
    },
    'derechos-arcop': { 
      title: 'Catálogo de Derechos ARCOP & Monitoreo de SLAs', 
      subtitle: 'SLA crítico de 2 días para Bloqueo Temporal y 30 días para ARCOP+' 
    },
    'multas-utm': { 
      title: 'Simulador de Sanciones y Multas en UTM', 
      subtitle: 'Régimen sancionatorio de la APDP y Beneficio Pyme (Ley 20.416)' 
    },
    'test-cumplimiento': { 
      title: 'Test Diagnóstico de Cumplimiento', 
      subtitle: 'Evalúa en 60 segundos el nivel de riesgo y preparación de tu empresa' 
    },
    'casos-pymes': { 
      title: 'Casos Prácticos en Pymes Chilenas', 
      subtitle: 'Situaciones operativas cotidianas: huellas, marketing y bloqueos' 
    },
    'guias-recursos': { 
      title: 'Guías Especializadas, Artículos & Recursos', 
      subtitle: 'Análisis de fiscalización, accountability y modelos de prevención' 
    },
    'compendio-legal': { 
      title: 'Compendio Normativo Interactivo Ley 21.719', 
      subtitle: 'Articulado completo con comentarios de aplicación práctica' 
    },
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-950 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAiChat={() => setIsAiOpen(true)}
      />

      {/* Page Breadcrumb (for subpages) */}
      {currentPage !== 'inicio' && (
        <div className="bg-zinc-50 border-b border-zinc-200 py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-500">
              <button 
                onClick={() => handleNavigate('inicio')}
                className="hover:text-orange-600 transition-colors flex items-center gap-1 font-bold text-zinc-700"
              >
                <span className="material-symbols-outlined text-sm">home</span>
                <span>Inicio</span>
              </button>
              <span className="text-zinc-300">/</span>
              <span className="text-orange-600 font-bold truncate max-w-xs sm:max-w-md">
                {pageNames[currentPage]?.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {currentPage !== 'agente-rat' && (
                <button
                  onClick={() => handleNavigate('agente-rat')}
                  className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-xs">psychology</span>
                  <span>Agente RAT (3 min)</span>
                </button>
              )}
              <button
                onClick={() => setIsAiOpen(true)}
                className="inline-flex items-center gap-1 bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-800 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-xs text-orange-500">smart_toy</span>
                <span>Asistente IA</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Section Page Routing */}
      <main className="flex-1">
        
        {/* VIEW 1: INICIO (Modern LegalTech Data Privacy SaaS Landing) */}
        {currentPage === 'inicio' && (
          <div>
            <Hero
              onNavigate={handleNavigate}
              onOpenAiChat={() => setIsAiOpen(true)}
            />
            <TrustBar />
            <ProblemSection
              onStartDiagnosis={() => {
                const el = document.getElementById('diagnostico');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <SolutionProcess
              onStartDiagnosis={() => {
                const el = document.getElementById('diagnostico');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <SmartDiagnosisSection
              onNavigate={handleNavigate}
              onOpenAiChat={() => setIsAiOpen(true)}
            />
            <ServicesSection
              onNavigate={handleNavigate}
              onOpenAiChat={() => setIsAiOpen(true)}
            />
            <RatExplainerSection
              onNavigate={handleNavigate}
            />
            <LeyExplainerSection
              onNavigate={handleNavigate}
            />
            <WhyUsSection />
            <FaqSection />
            <FinalCtaSection
              onNavigate={handleNavigate}
              onOpenAiChat={() => setIsAiOpen(true)}
            />
          </div>
        )}

        {/* VIEW 2: LA LEY 21.719 (Timeline + Compendio) */}
        {currentPage === 'ley-21719' && (
          <div>
            <TimelineVigencia onNavigate={handleNavigate} />
            <LegalArticlesGuide onGoToRat={() => handleNavigate('agente-rat')} />
          </div>
        )}

        {/* VIEW 3: AGENTE RAT (Art. 14 ter - Tramo 1 Obligatorio) */}
        {currentPage === 'agente-rat' && (
          <div>
            <Features onStartRat={() => {
              const el = document.getElementById('agente-rat');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} />
            <RatAgentWizard />
          </div>
        )}

        {/* VIEW 4: DERECHOS ARCOP & MONITOR DE SLAs */}
        {currentPage === 'derechos-arcop' && (
          <div>
            <ArcoManager onGoToRat={() => handleNavigate('agente-rat')} />
          </div>
        )}

        {/* VIEW 5: SIMULADOR DE MULTAS UTM & APDP */}
        {currentPage === 'multas-utm' && (
          <div>
            <UTMCalculator onGoToRat={() => handleNavigate('agente-rat')} />
          </div>
        )}

        {/* VIEW 6: TEST DE CUMPLIMIENTO */}
        {currentPage === 'test-cumplimiento' && (
          <div>
            <ComplianceChecklist onGoToRat={() => handleNavigate('agente-rat')} />
          </div>
        )}

        {/* VIEW 7: CASOS PRÁCTICOS EN PYMES */}
        {currentPage === 'casos-pymes' && (
          <div>
            <LabSection 
              onGoToRat={() => handleNavigate('agente-rat')}
              onOpenAiChat={() => setIsAiOpen(true)}
            />
          </div>
        )}

        {/* VIEW 8: GUÍAS, ARTÍCULOS & RECURSOS */}
        {currentPage === 'guias-recursos' && (
          <div>
            <BlogSection onNavigate={handleNavigate} />
          </div>
        )}

        {/* VIEW 9: COMPENDIO LEGAL */}
        {currentPage === 'compendio-legal' && (
          <div>
            <LegalArticlesGuide onGoToRat={() => handleNavigate('agente-rat')} />
          </div>
        )}

      </main>

      {/* Floating Bottom Navigator */}
      <FloatingNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onAiClick={() => setIsAiOpen(true)}
      />

      {/* Global Interactive AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onGoToRat={() => handleNavigate('agente-rat')}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAiChat={() => setIsAiOpen(true)}
      />

    </div>
  );
};

export default App;
