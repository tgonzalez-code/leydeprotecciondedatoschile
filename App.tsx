import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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

const App: React.FC = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-950 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        onOpenAiChat={() => setIsAiOpen(true)}
        onScrollTo={handleScrollTo}
      />

      {/* Landing Page Content Flow */}
      <main className="flex-1">
        
        {/* 1. Hero & Value Proposition (High Impact Minimalist White & Orange) */}
        <Hero
          onStartRat={() => handleScrollTo('agente-rat')}
          onOpenCalculator={() => handleScrollTo('multas-utm')}
          onOpenAiChat={() => setIsAiOpen(true)}
        />

        {/* 2. Interactive Compliance Checklist / Test de Diagnóstico */}
        <ComplianceChecklist
          onGoToRat={() => handleScrollTo('agente-rat')}
        />

        {/* 3. Interactive Legal Timeline (Entrada en Vigencia Gradual) */}
        <TimelineVigencia />

        {/* 4. 4-Step Methodology ("Cumplir sin frenar el negocio") */}
        <Features
          onStartRat={() => handleScrollTo('agente-rat')}
        />

        {/* 5. Interactive RAT Builder (Art. 14 ter - Tramo 1 Obligatorio) */}
        <RatAgentWizard />

        {/* 6. UTM Fines Simulator & SME Benefit (Ley 20.416) */}
        <UTMCalculator
          onGoToRat={() => handleScrollTo('agente-rat')}
        />

        {/* 7. ARCO+ Rights Manager & 2-day / 30-day SLA Monitor */}
        <ArcoManager
          onGoToRat={() => handleScrollTo('agente-rat')}
        />

        {/* 8. Practical Business Case Studies in Chilean SMEs */}
        <LabSection
          onGoToRat={() => handleScrollTo('agente-rat')}
          onOpenAiChat={() => setIsAiOpen(true)}
        />

        {/* 9. Specialized Guides & Authority Hub (SEO & Downloadable Resources) */}
        <BlogSection
          onScrollTo={handleScrollTo}
        />

        {/* 10. Legal Articles Compendium (Ley 21.719 / 19.628) */}
        <LegalArticlesGuide
          onGoToRat={() => handleScrollTo('agente-rat')}
        />

        {/* 11. High-Impact Orange Conversion Banner */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-orange-500 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <span className="inline-block bg-zinc-950 text-white font-mono text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
              TRAMO 1: ARTÍCULO 14 TER OBLIGATORIO
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">
              Protege tu empresa antes de una fiscalización de la APDP
            </h2>
            <p className="mt-4 text-base sm:text-xl text-orange-100 max-w-2xl mx-auto font-normal leading-relaxed">
              En solo 3 minutos tendrás tu Registro de Actividades de Tratamiento (RAT) listo para acreditar 
              cumplimiento, acceder al beneficio Pyme y resguardar el patrimonio de tu negocio.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => handleScrollTo('agente-rat')}
                className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-xl text-base shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Construir RAT con IA ahora (Gratis)</span>
                <span className="material-symbols-outlined text-orange-400 text-lg">arrow_forward</span>
              </button>
              <button
                onClick={() => setIsAiOpen(true)}
                className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border-2 border-white/60 font-mono font-bold px-6 py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">smart_toy</span>
                <span>Consultar al Asistente Legal</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Bottom Navigator */}
      <FloatingNav
        onScrollTo={handleScrollTo}
        onAiClick={() => setIsAiOpen(true)}
      />

      {/* Global Interactive AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onGoToRat={() => handleScrollTo('agente-rat')}
      />

      {/* Footer */}
      <Footer
        onScrollTo={handleScrollTo}
        onOpenAiChat={() => setIsAiOpen(true)}
      />

    </div>
  );
};

export default App;
