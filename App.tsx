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
    <div className="relative min-h-screen bg-[#070d1e] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
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
            <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-950 via-[#0d2254] to-blue-950 border-t border-blue-900/50">
              <div className="max-w-4xl mx-auto text-center">
                <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  TRAMO 1: ARTÍCULO 14 TER
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Protege tu Pyme antes de una fiscalización de la APDP
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl mx-auto">
                  En solo 3 minutos tendrás tu Registro de Actividades de Tratamiento listo para acreditar 
                  cumplimiento y resguardar el patrimonio de tu empresa.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => handleSelectTab('agente-rat')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 rounded-xl text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-105"
                  >
                    Construir RAT con IA ahora (Gratis)
                  </button>
                  <button
                    onClick={() => setIsAiOpen(true)}
                    className="bg-[#091533] hover:bg-[#102352] text-blue-200 border border-blue-700/60 font-semibold px-5 py-3 rounded-xl text-sm transition-all"
                  >
                    Hacer una pregunta al Asistente
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
      <div className="h-20"></div>

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
