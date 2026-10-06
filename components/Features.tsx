
import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  accentColor: 'primary' | 'acid-green';
  offset?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, accentColor, offset }) => {
  const accentClass = accentColor === 'primary' ? 'border-primary/50 text-primary' : 'border-acid-green/50 text-acid-green';
  const bgAccent = accentColor === 'primary' ? 'bg-primary/20' : 'bg-acid-green/20';

  return (
    <div className={`group flex gap-6 p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 ${offset ? 'lg:ml-12' : ''}`}>
      <div className={`${bgAccent} p-4 rounded-lg flex items-center justify-center h-fit`}>
        <span className={`material-symbols-outlined text-3xl`}>{icon}</span>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-zinc-400 leading-normal">{description}</p>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="relative py-32 px-6 lg:px-40 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-12 gap-8 lg:gap-1.5">
        <div className="col-span-12 lg:col-span-5 mb-20 lg:mb-0">
          <h2 className="text-4xl lg:text-7xl font-bold mb-8 leading-tight tracking-tighter">
            Nuestra Visión <br/>
            <span className="text-primary italic">Disruptiva</span>
          </h2>
          <p className="text-zinc-400 text-xl leading-relaxed max-w-md">
            Más que consultoría, somos arte digital aplicado al rendimiento. Rompemos las estructuras tradicionales para crear software que fluye.
          </p>
        </div>
        
        <div className="col-span-12 lg:col-start-7 lg:col-span-6 flex flex-col gap-8">
          <FeatureCard 
            icon="rocket_launch"
            title="Innovación Radical"
            description="Desafiamos los límites de lo convencional con soluciones que parecen ciencia ficción."
            accentColor="primary"
          />
          <FeatureCard 
            icon="water_drop"
            title="Código Fluido"
            description="Software que se adapta en tiempo real a las necesidades cambiantes del mercado."
            accentColor="acid-green"
            offset={true}
          />
          <FeatureCard 
            icon="view_in_ar"
            title="Ecosistemas 2026"
            description="Arquitecturas preparadas para la próxima década de hiper-conectividad."
            accentColor="primary"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
