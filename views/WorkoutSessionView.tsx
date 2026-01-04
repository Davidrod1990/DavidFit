
import React, { useState } from 'react';
import { WorkoutSession, AppView, SetLog } from '../types';

interface WorkoutSessionViewProps {
  session: WorkoutSession;
  onFinish: () => void;
  onRest: () => void;
  onNavigate: (view: AppView) => void;
}

const WorkoutSessionView: React.FC<WorkoutSessionViewProps> = ({ session, onFinish, onRest, onNavigate }) => {
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const exercise = session.exercises[activeExerciseIndex];
  
  // Local state for logging (simplified)
  const [sets, setSets] = useState<SetLog[]>([
    { id: '1', weight: 75, reps: 10, rpe: 8, completed: true },
    { id: '2', weight: 77.5, reps: 0, rpe: 0, completed: false },
    { id: '3', weight: 77.5, reps: 0, rpe: 0, completed: false },
  ]);

  const toggleSet = (index: number) => {
    const newSets = [...sets];
    newSets[index].completed = !newSets[index].completed;
    setSets(newSets);
    if (newSets[index].completed) onRest();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Overview */}
      <aside className="w-80 hidden lg:flex flex-col border-r border-border-dark bg-[#0d120e] p-6 space-y-8">
        <div className="flex items-center gap-4 pb-6 border-b border-border-dark">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-background-dark shadow-lg"></div>
          <div>
            <h2 className="font-black text-lg leading-tight">{session.title}</h2>
            <p className="text-xs text-text-muted">Semana {session.week} • Día {session.day}</p>
            <div className="mt-2 h-1.5 w-full bg-border-dark rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '35%' }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto pr-2">
          <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Rutina de Hoy</h3>
          {session.exercises.map((ex, i) => (
            <button 
              key={ex.id}
              onClick={() => setActiveExerciseIndex(i)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${i === activeExerciseIndex ? 'bg-surface-dark border-l-4 border-primary' : 'hover:bg-surface-dark opacity-60 hover:opacity-100'}`}
            >
              <span className={`material-symbols-outlined text-xl ${i < activeExerciseIndex ? 'text-primary' : i === activeExerciseIndex ? 'text-primary animate-pulse' : 'text-text-muted'}`}>
                {i < activeExerciseIndex ? 'check_circle' : i === activeExerciseIndex ? 'radio_button_checked' : 'radio_button_unchecked'}
              </span>
              <div className="text-left">
                <p className={`text-sm font-bold ${i === activeExerciseIndex ? 'text-white' : 'text-text-muted'}`}>{ex.name}</p>
                <p className="text-[10px] text-text-muted">{ex.muscleGroup}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Logging Area */}
      <main className="flex-1 flex flex-col bg-background-dark overflow-hidden relative">
        <header className="flex-none p-6 md:px-10 flex items-center justify-between bg-[#0d120e] border-b border-border-dark">
          <div className="flex items-center gap-3">
             <button onClick={() => onNavigate(AppView.DASHBOARD)} className="lg:hidden material-symbols-outlined">menu</button>
             <h2 className="text-xl font-black font-display tracking-tight">DavidFit</h2>
          </div>
          <button onClick={onFinish} className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-6 py-2 rounded-xl font-bold text-sm transition-all">Finalizar Sesión</button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-surface-dark p-8 rounded-[2rem] border border-border-dark shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-black font-display">{exercise.name}</h1>
                    <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">{exercise.muscleGroup}</span>
                  </div>
                  <p className="text-text-muted flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">info</span>
                    {exercise.instruction}
                  </p>
                </div>
                <div className="flex gap-2">
                  <RoundButton icon="history" label="Historial" />
                  <RoundButton icon="play_circle" label="Técnica" />
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border-dark">
                <MiniStats label="Mejor Anterior" value="80kg x 8" trend="+2.5%" />
                <MiniStats label="Volumen Hoy" value="1,200kg" trend="+5%" />
                <MiniStats label="1RM Est." value="102.5kg" />
              </div>

              {/* Logs Table */}
              <div className="overflow-x-auto pt-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-text-muted uppercase tracking-widest border-b border-border-dark">
                      <th className="pb-4 px-2 text-center w-12">Set</th>
                      <th className="pb-4 px-4">Anterior</th>
                      <th className="pb-4 px-4 text-center">Peso (Kg)</th>
                      <th className="pb-4 px-4 text-center">Reps</th>
                      <th className="pb-4 px-4">RPE</th>
                      <th className="pb-4 px-4 text-center">Listo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-dark">
                    {sets.map((set, i) => (
                      <tr key={set.id} className={`group transition-all ${set.completed ? 'opacity-40' : ''}`}>
                        <td className="py-5 px-2 text-center">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-xs ${set.completed ? 'bg-primary/20 text-primary' : 'bg-background-dark border border-border-dark text-white'}`}>{i+1}</span>
                        </td>
                        <td className="py-5 px-4 text-sm font-bold text-text-muted">
                          75kg x 10
                        </td>
                        <td className="py-5 px-4">
                          <input type="number" className="w-20 mx-auto block bg-background-dark border border-border-dark rounded-xl py-2 text-center font-black focus:ring-1 focus:ring-primary outline-none" defaultValue={set.weight} disabled={set.completed} />
                        </td>
                        <td className="py-5 px-4">
                          <input type="number" className="w-16 mx-auto block bg-background-dark border border-border-dark rounded-xl py-2 text-center font-black focus:ring-1 focus:ring-primary outline-none" placeholder="-" disabled={set.completed} />
                        </td>
                        <td className="py-5 px-4">
                          <input type="range" className="w-full h-1.5 bg-background-dark rounded-full appearance-none cursor-pointer accent-primary" min="5" max="10" step="0.5" disabled={set.completed} />
                        </td>
                        <td className="py-5 px-4 text-center">
                          <button 
                            onClick={() => toggleSet(i)}
                            className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${set.completed ? 'bg-primary border-primary text-background-dark' : 'border-border-dark text-transparent hover:text-primary hover:border-primary'}`}
                          >
                            <span className="material-symbols-outlined text-xl font-bold">check</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Session Notes */}
            <div className="space-y-4">
               <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.2em]">Notas de Sesión</h3>
               <textarea 
                  className="w-full bg-surface-dark border border-border-dark rounded-3xl p-6 min-h-[120px] focus:ring-1 focus:ring-primary outline-none text-lg leading-relaxed placeholder:text-text-muted/40"
                  placeholder="Sensaciones, molestias, ajustes para la próxima semana..."
               ></textarea>
            </div>
          </div>
        </div>

        {/* Floating Controls for Mobile */}
        <div className="bg-[#0d120e] border-t border-border-dark p-6 md:p-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Descanso</span>
              <div className="flex items-center gap-4">
                <button className="w-8 h-8 rounded-full bg-surface-dark flex items-center justify-center"><span className="material-symbols-outlined text-lg">remove</span></button>
                <span className="text-3xl font-black tabular-nums font-mono">01:45</span>
                <button className="w-8 h-8 rounded-full bg-surface-dark flex items-center justify-center"><span className="material-symbols-outlined text-lg">add</span></button>
              </div>
            </div>
          </div>
          <button className="bg-primary text-background-dark px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all">
            Siguiente Ejercicio <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
};

const RoundButton = ({ icon, label }: { icon: string, label: string }) => (
  <button className="flex items-center gap-2 bg-background-dark/50 hover:bg-background-dark border border-border-dark px-4 py-2 rounded-xl transition-all">
    <span className="material-symbols-outlined text-lg text-primary">{icon}</span>
    <span className="text-xs font-bold text-white">{label}</span>
  </button>
);

const MiniStats = ({ label, value, trend }: { label: string, value: string, trend?: string }) => (
  <div className="flex flex-col gap-1 p-4 bg-background-dark/30 rounded-2xl border border-border-dark/50">
    <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-black">{value}</span>
      {trend && <span className="text-xs text-primary font-bold">{trend}</span>}
    </div>
  </div>
);

export default WorkoutSessionView;
