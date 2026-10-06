
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 lg:px-40 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] liquid-blob-placeholder animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-acid-green/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="z-10 w-full max-w-[1200px] flex flex-col items-start gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-acid-green font-bold tracking-[0.3em] text-xs lg:text-sm uppercase animate-fade-in">
            2026 High-Innovation Protocol
          </span>
          <h1 className="text-6xl lg:text-[140px] font-black leading-[0.85] tracking-tighter text-glow">
            GENBETA:<br/>
            <span className="text-primary">EL FUTURO</span><br/>
            ES HOY
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start lg:items-center mt-8">
          <p className="text-lg lg:text-2xl max-w-[500px] font-light leading-relaxed text-zinc-400">
            Código Líquido. Arquitectura Evolutiva. Disrupción digital aplicada al rendimiento extremo.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary hover:bg-primary/80 text-white rounded-full px-10 py-5 font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(188,6,249,0.3)] group">
              Iniciar Proyecto
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
