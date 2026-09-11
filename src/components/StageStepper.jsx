import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { STAGES } from '../context/AssessmentContext';

export default function StageStepper() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentStageIndex = STAGES.findIndex(s => s.path === location.pathname);

  return (
    <div className="w-full bg-slate-900/60 dark:bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md px-4 py-2.5 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[760px] text-xs">
        {STAGES.map((stage, idx) => {
          const isCurrent = location.pathname === stage.path;
          const isPassed = currentStageIndex > idx;

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => navigate(stage.path)}
                className={`flex items-center gap-2 group transition-all py-1 px-2.5 rounded-lg text-left ${
                  isCurrent
                    ? 'bg-brand-500/20 text-brand-400 font-semibold ring-1 ring-brand-500/40'
                    : isPassed
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                    : 'text-slate-500 hover:text-slate-400 hover:bg-slate-800/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isCurrent
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/40'
                      : isPassed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isPassed ? <Check className="w-3 h-3 stroke-[3]" /> : stage.step}
                </div>
                <span className="whitespace-nowrap tracking-wide">{stage.label}</span>
              </button>

              {idx < STAGES.length - 1 && (
                <ArrowRight
                  className={`w-3.5 h-3.5 flex-shrink-0 ${
                    currentStageIndex > idx ? 'text-emerald-500/60' : 'text-slate-700'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
