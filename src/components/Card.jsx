import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  glow = false,
  padding = 'p-6',
}) {
  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${padding} 
        dark:bg-slate-900/70 dark:border-slate-800/80 dark:text-slate-100
        bg-white/90 border-slate-200/90 text-slate-800
        border backdrop-blur-xl shadow-xl shadow-slate-950/5 dark:shadow-slate-950/40
        ${hoverEffect ? 'hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-0.5' : ''}
        ${glow ? 'glow-brand border-brand-500/30 ring-1 ring-brand-500/20' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
