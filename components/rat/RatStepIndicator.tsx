import React from 'react';

export interface RatStepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const STEPS = [
  { num: 1, label: '1. Empresa' },
  { num: 2, label: '2. Tratamientos' },
  { num: 3, label: '3. Clasificación' },
  { num: 4, label: '4. Ficha Oficial' },
];

export const RatStepIndicator: React.FC<RatStepIndicatorProps> = ({
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="flex items-center gap-1 bg-zinc-100 p-1.5 rounded-xl border border-zinc-200 self-start md:self-auto font-mono text-xs">
      {STEPS.map((s) => (
        <button
          key={s.num}
          type="button"
          onClick={() => onStepClick(s.num)}
          className={`px-3 py-2 rounded-lg font-bold transition-all ${
            currentStep === s.num
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
              : currentStep > s.num
              ? 'bg-white text-zinc-900 border border-zinc-300'
              : 'text-zinc-600 hover:text-zinc-950'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};
