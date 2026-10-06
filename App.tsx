
import React, { useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import LabSection from './components/LabSection';
import FloatingNav from './components/FloatingNav';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-primary selection:text-white">
      <Hero />
      <Features />
      <Stats />
      <LabSection />
      
      {/* Spacer for bottom nav */}
      <div className="h-40"></div>
      
      <FloatingNav onAiClick={() => setIsAiOpen(true)} />
      
      {isAiOpen && (
        <AIAssistant onClose={() => setIsAiOpen(false)} />
      )}
    </div>
  );
};

export default App;
