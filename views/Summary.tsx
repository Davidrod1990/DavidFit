
import React from 'react';

interface SummaryProps {
  onDone: () => void;
}

const Summary: React.FC<SummaryProps> = ({ onDone }) => {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-6 text-center space-y-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150"></div>
        <span className="material-symbols-outlined text-[120px] text-primary relative z-10 animate-in zoom-in duration-700">check_circle</span>
      </div>

      <div className="space-y-4 relative z-10">
        <h1 className="text-6xl font-black font-display tracking-tight leading-none">¡Éxito, David!</h1>
        <p className="text-2xl text-text-muted font-light max-w-xl mx-auto">Has superado tu volumen total de la semana pasada por un <span className="text-primary font-black">12%</span>. La ciencia dice que hoy eres mejor que ayer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl relative z-10">
        <SummaryCard icon="weight" label="VOLUMEN" value="6,450 kg" />
        <SummaryCard icon="timer" label="DURACIÓN" value="52 min" />
        <SummaryCard icon="psychology" label="ADHERENCIA" value="95/100" />
      </div>

      <button 
        onClick={onDone}
        className="bg-primary text-background-dark px-16 py-6 rounded-3xl font-black text-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all relative z-10"
      >
        Guardar Entrenamiento
      </button>

      <div className="flex gap-4 relative z-10">
        <button className="text-text-muted font-bold flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
          <span className="material-symbols-outlined">share</span> Compartir Logro
        </button>
        <button className="text-text-muted font-bold flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
          <span className="material-symbols-outlined">analytics</span> Ver Análisis IA
        </button>
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, label, value }: any) => (
  <div className="bg-surface-dark p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center gap-2">
    <span className="material-symbols-outlined text-primary text-4xl mb-2">{icon}</span>
    <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">{label}</span>
    <span className="text-3xl font-black tracking-tight">{value}</span>
  </div>
);

export default Summary;
