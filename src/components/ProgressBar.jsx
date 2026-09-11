import React from 'react';

export default function ProgressBar({
  progress = 0,
  label = '',
  showValue = true,
  color = 'brand',
  height = 'h-2.5',
  className = '',
}) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const gradientColors = {
    brand: 'from-brand-500 to-violet-500',
    emerald: 'from-teal-500 to-emerald-500',
    amber: 'from-amber-500 to-orange-500',
    rose: 'from-rose-500 to-red-500',
    cyan: 'from-blue-500 to-cyan-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          {label && <span className="text-slate-400 dark:text-slate-400">{label}</span>}
          {showValue && <span className="text-slate-200 font-semibold">{clampedProgress}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-800/80 rounded-full overflow-hidden ${height} p-0.5 border border-slate-300/40 dark:border-slate-700/50`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradientColors[color] || gradientColors.brand} transition-all duration-500 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
