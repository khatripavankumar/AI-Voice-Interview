import React from 'react';

export default function CircularProgress({
  value = 0,
  size = 110,
  strokeWidth = 9,
  label = '',
  sublabel = '',
  color = 'brand',
  className = '',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clampedValue = Math.min(100, Math.max(0, value));
  const offset = circumference - (clampedValue / 100) * circumference;

  const strokeGradients = {
    brand: { from: '#6366f1', to: '#a855f7' },
    emerald: { from: '#10b981', to: '#14b8a6' },
    amber: { from: '#f59e0b', to: '#ea580c' },
    rose: { from: '#f43f5e', to: '#e11d48' },
    cyan: { from: '#06b6d4', to: '#3b82f6' },
  };

  const currentGradient = strokeGradients[color] || strokeGradients.brand;
  const gradientId = `circular-grad-${color}-${size}`;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentGradient.from} />
              <stop offset="100%" stopColor={currentGradient.to} />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            className="text-slate-200 dark:text-slate-800/80"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Animated progress circle */}
          <circle
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {clampedValue}%
          </span>
          {sublabel && (
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {label && (
        <span className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300 text-center">
          {label}
        </span>
      )}
    </div>
  );
}
