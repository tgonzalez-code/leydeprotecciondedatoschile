import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import LabSection from './components/LabSection';
import RatAgentWizard from './components/RatAgentWizard';
import UTMCalculator from './components/UTMCalculator';
import ArcoManager from './components/ArcoManager';
import LegalArticlesGuide from './components/LegalArticlesGuide';
import FloatingNav from './components/FloatingNav';
import AIAssistantModal from './components/AIAssistantModal';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('inicio');
  const [isAiOpen, setIsAiOpen] = useState(false);

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Main Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenAiChat={() => setIsAiOpen(true)}
      />

      {/* Main Views Container */}
      <main className="flex-1">
        {currentTab === 'inicio' && (
          <>
            <Hero
              onStartRat={() => handleSelectTab('agente-rat')}
              onOpenCalculator={() => handleSelectTab('calculadora-utm')}
              onOpenAiChat={() => setIsAiOpen(true)}
            />
            <Features onStartRat={() => handleSelectTab('agente-rat')} />
            <Stats
              onGoToRat={() => handleSelectTab('agente-rat')}
              onGoToCalculator={() => handleSelectTab('calculadora-utm')}
            />
            <LabSection
              onGoToRat={() => handleSelectTab('agente-rat')}
              onOpenAiChat={() => setIsAiOpen(true)}
            />

            {/* Bottom Callout Banner on Home */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
              <div className="max-w-4xl mx-auto text-center">
                <span className="text-blue-900 font-mono text-[10px] font-bold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  TRAMO 1: ARTÍCULO 14 TER OBLIGATORIO
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-slate-900 mt-2">
                  Protege tu Pyme antes de una fiscalización de la APDP
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl mx-auto leading-relaxed">
                  En solo 3 minutos tendrás tu Registro de Actividades de Tratamiento (RAT) listo para acreditar 
                  cumplimiento y resguardar el patrimonio de tu empresa.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => handleSelectTab('agente-rat')}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-lg text-xs shadow-sm transition-all"
                  >
                    Construir RAT con IA ahora (Gratis)
                  </button>
                  <button
                    onClick={() => setIsAiOpen(true)}
                    className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold px-4 py-2.5 rounded-lg text-xs transition-all"
                  >
                    Consultar con el Asistente Legal
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {currentTab === 'agente-rat' && (
          <RatAgentWizard />
        )}

        {currentTab === 'calculadora-utm' && (
          <UTMCalculator onGoToRat={() => handleSelectTab('agente-rat')} />
        )}

        {currentTab === 'gestion-arco' && (
          <ArcoManager onGoToRat={() => handleSelectTab('agente-rat')} />
        )}

        {currentTab === 'guia-ley' && (
          <LegalArticlesGuide onGoToRat={() => handleSelectTab('agente-rat')} />
        )}
      </main>

      {/* Spacer for bottom floating nav */}
      <div className="h-16"></div>

      {/* Floating Bottom Navigator */}
      <FloatingNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onAiClick={() => setIsAiOpen(true)}
      />

      {/* Global Interactive AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onGoToRat={() => handleSelectTab('agente-rat')}
      />

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenAiChat={() => setIsAiOpen(true)}
      />

    </div>
  );
};

export default App;
