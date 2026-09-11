import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5 font-semibold",
    xl: "text-lg px-8 py-3.5 gap-3 font-bold",
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white shadow-lg shadow-brand-500/25 border border-brand-400/30 focus:ring-brand-500",
    secondary: "bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 border border-slate-700/60 shadow-sm focus:ring-slate-500 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 light:bg-slate-100 light:text-slate-800 light:hover:bg-slate-200 light:border-slate-300",
    outline: "bg-transparent border border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:text-white focus:ring-slate-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 light:border-slate-300 light:text-slate-700 light:hover:bg-slate-100",
    ghost: "bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-slate-100 focus:ring-slate-500 dark:hover:bg-slate-800/60 dark:text-slate-300 light:hover:bg-slate-100 light:text-slate-600",
    success: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 border border-emerald-400/30 focus:ring-emerald-500",
    danger: "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-500/25 border border-rose-400/30 focus:ring-rose-500",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
          {children}
        </>
      )}
    </button>
  );
}
