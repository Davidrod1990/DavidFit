
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile, WorkoutSession } from '../types';
import { analyzeProgress } from '../geminiService';

interface DashboardProps {
  user: UserProfile;
  onStartWorkout: (session: WorkoutSession) => void;
  onNavigate: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onStartWorkout, onNavigate }) => {
  const [behaviorTip, setBehaviorTip] = useState('Cargando tip científico...');

  useEffect(() => {
    const fetchTip = async () => {
      const tip = await analyzeProgress({ streak: user.streak, weight: user.weight });
      setBehaviorTip(tip);
    };
    fetchTip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todaySession: WorkoutSession = {
    id: 's-1',
    title: 'Empuje: Pecho & Tríceps',
    week: 4,
    day: 2,
    exercises: [
      { id: 'e1', name: 'Press de Banca con Barra', muscleGroup: 'Pecho', instruction: 'Fase excéntrica controlada (3s).', sets: [] },
      { id: 'e2', name: 'Press Militar', muscleGroup: 'Hombro', instruction: 'Rango de movimiento completo.', sets: [] },
    ]
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Nav */}
      <aside className="w-72 hidden lg:flex flex-col border-r border-border-dark bg-[#0d120e] p-6 space-y-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary bg-center bg-cover" style={{ backgroundImage: 'url("https://picsum.photos/id/64/200/200")' }}></div>
          <div>
            <h1 className="font-black text-xl tracking-tighter">DavidFit</h1>
            <p className="text-xs text-text-muted">Plan Premium</p>
          </div>
        </div>

        <nav className="flex flex-col gap-3">
          <NavItem active icon="dashboard" label="Dashboard" onClick={() => {}} />
          <NavItem icon="fitness_center" label="Mis Rutinas" onClick={() => {}} />
          <NavItem icon="monitoring" label="Progreso" onClick={() => onNavigate(AppView.PROGRESS)} />
          <NavItem icon="restaurant_menu" label="Nutrición" onClick={() => {}} />
          <NavItem icon="psychology" label="AI Coach" onClick={() => onNavigate(AppView.AI_COACH)} />
        </nav>

        <div className="mt-auto border-t border-border-dark pt-6">
          <NavItem icon="settings" label="Configuración" onClick={() => {}} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background-dark p-6 lg:p-12">
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-black font-display tracking-tight">Hola, {user.name}</h2>
              <p className="text-text-muted mt-2">Martes, 24 de Octubre. ¡Es hora de un entrenamiento de élite!</p>
            </div>
            <div className="bg-surface-dark px-6 py-3 rounded-2xl flex items-center gap-3 border border-border-dark shadow-sm">
              <span className="material-symbols-outlined text-orange-500 fill-1">local_fire_department</span>
              <span className="font-black text-xl">Racha: {user.streak} Días</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              {/* Today's Workout Hero */}
              <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-dark group cursor-pointer transition-transform hover:scale-[1.01] shadow-2xl border border-white/5">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent"></div>
                <div className="relative z-10 p-10 md:p-14 flex flex-col justify-between min-h-[400px]">
                  <div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/20 text-xs font-bold text-primary mb-6">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      PROGRAMADO PARA HOY
                    </span>
                    <h3 className="text-5xl font-black mb-4 font-display leading-tight">{todaySession.title}</h3>
                    <p className="text-lg text-text-muted max-w-lg leading-relaxed">
                      Enfoque en fuerza e hipertrofia. Controla la fase excéntrica y explota en la concéntrica. 
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mt-12">
                    <div className="flex gap-10">
                      <StatMini icon="timer" label="DURACIÓN" value="60 min" />
                      <StatMini icon="bolt" label="INTENSIDAD" value="Alta" />
                    </div>
                    <button 
                      onClick={() => onStartWorkout(todaySession)}
                      className="bg-primary hover:bg-[#0fd650] text-background-dark px-12 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(19,236,91,0.4)] transition-all hover:-translate-y-1 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-3xl">play_circle</span> Iniciar Entrenamiento
                    </button>
                  </div>
                </div>
              </div>

              {/* Behavior Science Tip */}
              <div className="bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r-2xl flex gap-5 items-start">
                <span className="material-symbols-outlined text-blue-400 text-3xl">psychology</span>
                <div>
                  <h4 className="text-blue-100 font-black text-sm uppercase tracking-widest mb-1">Ciencia del Comportamiento</h4>
                  <p className="text-blue-200/90 leading-relaxed text-lg">{behaviorTip}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              {/* Mini Stats */}
              <div className="grid grid-cols-2 gap-4">
                <KPIBox icon="emoji_events" label="Objetivo Sem." value="3/4" sub="sesiones" progress={75} color="orange" />
                <KPIBox icon="fitness_center" label="Volumen Total" value="12.5k" sub="+5%" progress={100} color="purple" />
              </div>

              {/* Body Progress */}
              <div className="bg-surface-dark p-6 rounded-3xl border border-border-dark space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-xl font-display">Progreso Corporal</h3>
                  <button onClick={() => onNavigate(AppView.PROGRESS)} className="text-primary text-xs font-bold hover:underline uppercase tracking-wider">Ver todos</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background-dark/50 p-4 rounded-2xl border border-border-dark text-center">
                    <p className="text-xs text-text-muted mb-1">Peso Actual</p>
                    <p className="text-xl font-black tracking-tight">{user.weight} kg</p>
                    <p className="text-[10px] text-red-400 font-bold">-0.5kg</p>
                  </div>
                  <div className="bg-background-dark/50 p-4 rounded-2xl border border-border-dark text-center">
                    <p className="text-xs text-text-muted mb-1">Grasa Corp.</p>
                    <p className="text-xl font-black tracking-tight">{user.bodyFat}%</p>
                    <p className="text-[10px] text-red-400 font-bold">-0.2%</p>
                  </div>
                </div>
                <button className="w-full py-4 rounded-2xl border-2 border-border-dark hover:border-primary/50 text-text-muted hover:text-white transition-all font-bold flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">add</span> Registrar Medidas
                </button>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="font-black text-xl font-display">Accesos Rápidos</h3>
                <QuickAction icon="add_circle" title="Crear Nueva Rutina" sub="Personaliza tu plan" color="blue" />
                <QuickAction icon="restaurant" title="Plan de Nutrición" sub="Ver macros de hoy" color="green" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }: { icon: string, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group w-full ${active ? 'bg-primary/20 text-primary border border-primary/20' : 'text-text-muted hover:bg-surface-dark hover:text-white'}`}
  >
    <span className={`material-symbols-outlined text-2xl ${active ? 'fill-1' : ''}`}>{icon}</span>
    <span className={`font-bold tracking-tight text-base ${active ? '' : 'group-hover:translate-x-1'} transition-transform`}>{label}</span>
  </button>
);

const StatMini = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">{label}</span>
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-primary text-2xl">{icon}</span>
      <span className="font-black text-2xl tracking-tighter">{value}</span>
    </div>
  </div>
);

const KPIBox = ({ icon, label, value, sub, progress, color }: any) => {
  const colorMap: any = {
    orange: 'bg-orange-500/10 text-orange-500',
    purple: 'bg-purple-500/10 text-purple-500',
  };
  return (
    <div className="bg-surface-dark p-5 rounded-3xl border border-border-dark flex flex-col gap-2">
      <div className={`w-10 h-10 rounded-xl ${colorMap[color]} flex items-center justify-center`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black tracking-tight">{value}</span>
        <span className="text-xs text-text-muted font-bold">{sub}</span>
      </div>
      <div className="w-full bg-background-dark h-1.5 rounded-full mt-2 overflow-hidden">
        <div className={`h-full ${color === 'orange' ? 'bg-orange-500' : 'bg-purple-500'} rounded-full transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

const QuickAction = ({ icon, title, sub, color }: any) => (
  <button className="w-full flex items-center gap-4 p-4 bg-surface-dark hover:bg-[#233328] rounded-3xl transition-all border border-border-dark hover:border-primary/20 group">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${color === 'blue' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}`}>
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <div className="text-left">
      <h4 className="font-bold text-sm tracking-tight">{title}</h4>
      <p className="text-xs text-text-muted">{sub}</p>
    </div>
    <span className="material-symbols-outlined ml-auto text-text-muted text-lg group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
  </button>
);

export default Dashboard;
