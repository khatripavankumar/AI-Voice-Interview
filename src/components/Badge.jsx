import React from 'react';

export default function Badge({
  children,
  variant = 'brand',
  size = 'md',
  dot = false,
  className = '',
}) {
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  };

  const variantStyles = {
    brand: 'bg-brand-500/15 text-brand-400 border border-brand-500/30 dark:text-brand-300',
    emerald: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 dark:text-emerald-300',
    amber: 'bg-amber-500/15 text-amber-400 border border-amber-500/30 dark:text-amber-300',
    rose: 'bg-rose-500/15 text-rose-400 border border-rose-500/30 dark:text-rose-300',
    purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/30 dark:text-purple-300',
    cyan: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 dark:text-cyan-300',
    slate: 'bg-slate-500/15 text-slate-400 border border-slate-500/30 dark:text-slate-300',
  };

  const dotColors = {
    brand: 'bg-brand-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    purple: 'bg-purple-400',
    cyan: 'bg-cyan-400',
    slate: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full backdrop-blur-md ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColors[variant] || 'bg-brand-400'}`} />
      )}
      {children}
    </span>
  );
}
