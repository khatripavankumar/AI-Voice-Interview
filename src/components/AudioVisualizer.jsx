import React, { useEffect, useState } from 'react';

export default function AudioVisualizer({
  isActive = false,
  isRecording = false,
  barCount = 28,
  height = 'h-14',
  color = 'brand',
  className = '',
}) {
  const [heights, setHeights] = useState(() => Array(barCount).fill(15));

  useEffect(() => {
    let interval;
    if (isActive || isRecording) {
      interval = setInterval(() => {
        setHeights(() =>
          Array.from({ length: barCount }, (_, i) => {
            // Create organic wave shape with center peak and random fluctuation
            const centerDistance = Math.abs(i - barCount / 2) / (barCount / 2);
            const baseFactor = 1 - centerDistance * 0.45;
            const randomJitter = Math.random() * 0.65 + 0.35;
            const calculatedHeight = Math.floor(baseFactor * randomJitter * 85 + 15);
            return Math.min(100, Math.max(12, calculatedHeight));
          })
        );
      }, 90);
    } else {
      setHeights(Array(barCount).fill(12));
    }

    return () => clearInterval(interval);
  }, [isActive, isRecording, barCount]);

  const colorStyles = {
    brand: 'from-brand-500 via-indigo-500 to-violet-400',
    emerald: 'from-teal-400 via-emerald-400 to-green-500',
    rose: 'from-rose-500 via-red-400 to-amber-400',
  };

  const activeColor = isRecording ? colorStyles.emerald : (colorStyles[color] || colorStyles.brand);

  return (
    <div className={`flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-2 ${height} ${className}`}>
      {heights.map((barHeight, idx) => (
        <div
          key={idx}
          className={`w-1 sm:w-1.5 rounded-full transition-all duration-100 ease-out ${
            isActive || isRecording
              ? `bg-gradient-to-t ${activeColor} opacity-90 shadow-sm shadow-brand-500/30`
              : 'bg-slate-300 dark:bg-slate-800 opacity-40'
          }`}
          style={{
            height: `${barHeight}%`,
            transitionDuration: isActive || isRecording ? '90ms' : '300ms',
          }}
        />
      ))}
    </div>
  );
}
