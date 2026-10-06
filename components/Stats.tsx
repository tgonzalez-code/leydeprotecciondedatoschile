
import React from 'react';

const StatCard: React.FC<{ label: string, value: string, trend?: string, trendIcon?: string, trendColor?: string }> = ({ label, value, trend, trendIcon, trendColor = 'text-acid-green' }) => (
  <div className="flex flex-col gap-4 p-10 rounded-xl border border-primary/20 bg-void/50 backdrop-blur-sm transition-all hover:border-primary/50">
    <p className="text-zinc-400 text-sm font-medium uppercase tracking-widest">{label}</p>
    <p className={`text-5xl lg:text-6xl font-black ${trendColor === 'text-white' ? 'text-white' : trendColor === 'text-acid-green' ? 'text-acid-green' : 'text-primary'}`}>
      {value}
    </p>
    {trend && (
      <p className={`${trendColor} text-base flex items-center gap-1 font-bold`}>
        {trendIcon && <span className="material-symbols-outlined text-sm">{trendIcon}</span>}
        {trend}
      </p>
    )}
  </div>
);

const Stats: React.FC = () => {
  return (
    <section className="bg-void/10 py-32 px-6 lg:px-40 relative border-y border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter mb-4">EL MANIFIESTO GENBETA</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full shadow-[0_0_10px_#bc06f9]"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            label="Proyectos Lanzados"
            value="42"
            trend="+15% anual"
            trendIcon="trending_up"
            trendColor="text-acid-green"
          />
          <StatCard 
            label="Eficiencia IA"
            value="99.9%"
            trend="Optimización Total"
            trendIcon="bolt"
            trendColor="text-white"
          />
          <StatCard 
            label="Latencia Media"
            value="0.1ms"
            trend="Tiempo de respuesta 2026"
            trendColor="text-acid-green"
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
