import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import InformativeCarousel from './components/InformativeCarousel';
import { HOME_METRICS } from './content/home';
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
        
        {/* VIEW 1: INICIO (Enfocado en lo más relevante, claro y sin sobrecarga) */}
        {currentPage === 'inicio' && (
          <div className="space-y-10 sm:space-y-14 pb-16">
            {/* Hero Principal con propuesta en 5 segundos y simulador por rubro */}
            <Hero
              onNavigate={handleNavigate}
              onOpenAiChat={() => setIsAiOpen(true)}
            />

            {/* Barra de confianza ejecutiva */}
            <TrustBar />

            {/* Carrusel Informativo de Actualidad Regulatoria (con enlace a cada post) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <InformativeCarousel onNavigate={handleNavigate} />
            </section>

            {/* Las 3 Herramientas Clave para tu Empresa (Lo más relevante) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-zinc-50 border-2 border-zinc-200 rounded-3xl p-6 sm:p-10">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                  <span className="text-[11px] font-mono font-bold bg-orange-100 text-orange-950 px-3 py-1 rounded-full border border-orange-200 uppercase">
                    HERRAMIENTAS CLAVE DE CUMPLIMIENTO
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-zinc-950 mt-3 tracking-tight">
                    Todo lo esencial para preparar tu empresa
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-2">
                    Accede a las 3 soluciones centrales para cumplir la Ley 21.719 de forma simple, rápida y sin burocracia.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Test Diagnóstico */}
                  <div className="bg-white rounded-2xl border-2 border-zinc-950 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-2xl">checklist</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-orange-600 uppercase">Diagnóstico Inicial</span>
                      <h3 className="text-lg font-bold text-zinc-950 mt-1 mb-2">Test de Cumplimiento (60 seg)</h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Detecta en 1 minuto las principales brechas de tu empresa frente a la Ley 21.719 y recibe prioridades inmediatas.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('test-cumplimiento')}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm"
                    >
                      <span>Iniciar Diagnóstico</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>

                  {/* Card 2: Agente RAT con IA */}
                  <div className="bg-white rounded-2xl border-2 border-orange-500 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all relative">
                    <span className="absolute -top-3 right-6 bg-orange-500 text-white text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase">
                      Obligatorio Art. 14 ter
                    </span>
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-4 shadow-md shadow-orange-500/30">
                        <span className="material-symbols-outlined text-2xl">psychology</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-orange-600 uppercase">LegalTech con IA</span>
                      <h3 className="text-lg font-bold text-zinc-950 mt-1 mb-2">Agente RAT Inteligente</h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Entrevista guiada de 3 minutos para generar la Ficha Oficial del Registro de Actividades de Tratamiento para la APDP.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('agente-rat')}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-orange-500/25"
                    >
                      <span>Generar Ficha con IA</span>
                      <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    </button>
                  </div>

                  {/* Card 3: Simulador de Multas UTM */}
                  <div className="bg-white rounded-2xl border-2 border-zinc-950 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-2xl">calculate</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase">Impacto Financiero</span>
                      <h3 className="text-lg font-bold text-zinc-950 mt-1 mb-2">Simulador de Multas UTM</h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Calcula sanciones en UTM y CLP ($67.294) según la gravedad y conoce los requisitos del Beneficio Pyme (Ley 20.416).
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('multas-utm')}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm"
                    >
                      <span>Calcular Multas</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Franja de 4 Métricas Clave de la Ley 21.719 */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-zinc-900 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {HOME_METRICS.map((metrica, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className={`text-2xl sm:text-3xl font-display font-black ${metrica.color}`}>
                      {metrica.valor}
                    </span>
                    <p className="text-xs font-mono text-zinc-300">{metrica.titulo}</p>
                    <p className="text-[11px] text-zinc-400">{metrica.descripcion}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Final Conciso */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="max-w-xl space-y-2 text-center md:text-left">
                  <span className="text-xs font-mono font-bold bg-white/20 text-white px-3 py-1 rounded-full uppercase">
                    Orientación Inmediata
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-black">
                    ¿Tienes dudas sobre los datos en tu empresa?
                  </h3>
                  <p className="text-xs sm:text-sm text-orange-100">
                    Resuelve consultas sobre la Ley 21.719 con nuestro Asistente Especializado o realiza el diagnóstico de 60 segundos.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsAiOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-zinc-950 hover:bg-zinc-100 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <span className="material-symbols-outlined text-orange-500 text-base">smart_toy</span>
                    <span>Consultar Asistente IA</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('test-cumplimiento')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <span>Iniciar Diagnóstico</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </section>
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
