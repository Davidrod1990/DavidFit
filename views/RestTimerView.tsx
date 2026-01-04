
import React, { useState, useEffect } from 'react';

interface RestTimerViewProps {
  onSkip: () => void;
  onFinish: () => void;
}

const RestTimerView: React.FC<RestTimerViewProps> = ({ onSkip, onFinish }) => {
  const [seconds, setSeconds] = useState(90);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onFinish]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressOffset = 565.48 - (565.48 * (seconds / 90));

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background-dark p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <header className="absolute top-0 w-full p-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">fitness_center</span>
          <span className="text-2xl font-black font-display tracking-tighter">DavidFit</span>
        </div>
        <div className="bg-surface-dark px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-500 text-sm">local_fire_department</span>
          <span className="text-xs font-bold">Racha: 12 Días</span>
        </div>
      </header>

      <div className="text-center space-y-4 mb-12 relative z-10">
        <h1 className="text-4xl font-black font-display">Descanso & Recuperación</h1>
        <p className="text-text-muted italic text-lg opacity-60">"La paciencia también es una forma de acción."</p>
      </div>

      <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center mb-16 relative z-10">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
          <circle cx="100" cy="100" fill="none" r="90" stroke="#1c2e22" strokeWidth="10"></circle>
          <circle 
            cx="100" cy="100" fill="none" r="90" 
            stroke="#13ec5b" strokeWidth="10" 
            strokeLinecap="round" 
            strokeDasharray="565.48" 
            strokeDashoffset={progressOffset}
            className="transition-all duration-1000 ease-linear"
          ></circle>
        </svg>
        <div className="absolute flex flex-col items-center justify-center animate-pulse">
          <span className="text-7xl md:text-8xl font-black tabular-nums font-mono tracking-tighter">{formatTime(seconds)}</span>
          <div className="flex items-center gap-2 text-primary mt-4">
            <span className="material-symbols-outlined text-sm">timer</span>
            <span className="text-sm font-black uppercase tracking-[0.2em]">Restantes</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full max-w-sm relative z-10">
        <button onClick={() => setSeconds(s => Math.max(0, s - 10))} className="flex-1 py-4 bg-surface-dark border border-white/5 rounded-2xl font-bold hover:bg-white/5 transition-all">- 10s</button>
        <button onClick={onSkip} className="flex-[2] py-4 bg-primary text-background-dark rounded-2xl font-black text-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">Saltar</button>
        <button onClick={() => setSeconds(s => s + 10)} className="flex-1 py-4 bg-surface-dark border border-white/5 rounded-2xl font-bold hover:bg-white/5 transition-all">+ 10s</button>
      </div>

      {/* Media Player Dock */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-xl">
        <div className="bg-[#111] border border-white/10 p-3 rounded-3xl flex items-center gap-4 shadow-2xl">
          <div className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0 border border-white/10" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=200")' }}></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#1DB954] rounded-full flex items-center justify-center text-[8px] text-black font-bold">S</span>
              <p className="text-sm font-bold truncate">Stronger Than You</p>
            </div>
            <p className="text-xs text-text-muted truncate">DavidFit Performance Radio</p>
          </div>
          <div className="flex items-center gap-4 px-4">
            <span className="material-symbols-outlined text-text-muted cursor-pointer hover:text-white">skip_previous</span>
            <span className="material-symbols-outlined text-4xl text-white cursor-pointer hover:scale-110 transition-transform">play_circle</span>
            <span className="material-symbols-outlined text-text-muted cursor-pointer hover:text-white">skip_next</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestTimerView;
