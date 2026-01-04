
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    goal: 'Hypertrophy',
    experience: 'Intermediate',
    environment: 'Commercial Gym',
    streak: 0,
    weight: 80,
    bodyFat: 15
  });

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(profile);
  };

  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
       <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border-dark bg-background-dark/90 backdrop-blur-md px-10 py-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">fitness_center</span>
          <h2 className="text-xl font-black font-display tracking-tighter">DavidFit</h2>
        </div>
        <button className="text-text-muted hover:text-white font-bold text-sm">Guardar y Salir</button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-4xl space-y-12 pb-32">
          {/* Progress Bar */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <p className="font-bold text-text-muted">Configuración de Perfil: Paso {step} de 3</p>
              <p className="text-primary font-black">{Math.round((step / 3) * 100)}%</p>
            </div>
            <div className="w-full h-2 bg-surface-dark rounded-full overflow-hidden">
              <div className="h-full bg-primary shadow-[0_0_15px_#13ec5b] transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-5xl font-black font-display tracking-tight">¿Cuál es tu objetivo?</h1>
              <p className="text-xl text-text-muted leading-relaxed max-w-2xl">Diseñamos hábitos que perduran. Necesitamos saber qué buscas para adaptar tus recordatorios y rutinas.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <OptionCard 
                  active={profile.goal === 'Hypertrophy'} 
                  onClick={() => setProfile({...profile, goal: 'Hypertrophy'})}
                  icon="muscle" 
                  title="Hipertrofia" 
                  desc="Crecimiento y estética muscular"
                  img="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=400"
                />
                <OptionCard 
                  active={profile.goal === 'Strength'} 
                  onClick={() => setProfile({...profile, goal: 'Strength'})}
                  icon="fitness_center" 
                  title="Fuerza" 
                  desc="Poder crudo y rendimiento"
                  img="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=400"
                />
                <OptionCard 
                  active={profile.goal === 'Health'} 
                  onClick={() => setProfile({...profile, goal: 'Health'})}
                  icon="favorite" 
                  title="Salud Gen." 
                  desc="Longevidad y energía vital"
                  img="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400"
                />
                <OptionCard 
                  active={profile.goal === 'Fat Loss'} 
                  onClick={() => setProfile({...profile, goal: 'Fat Loss'})}
                  icon="straighten" 
                  title="Definición" 
                  desc="Perder grasa manteniendo músculo"
                  img="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-5xl font-black font-display tracking-tight">Nivel de Experiencia</h1>
              <p className="text-xl text-text-muted leading-relaxed max-w-2xl">Ajustamos la complejidad de tus rutinas para asegurar progreso sin lesiones.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ChoiceCard 
                  active={profile.experience === 'Novice'}
                  onClick={() => setProfile({...profile, experience: 'Novice'})}
                  icon="child_care"
                  title="Principiante"
                  desc="Menos de 6 meses de entrenamiento constante."
                />
                <ChoiceCard 
                  active={profile.experience === 'Intermediate'}
                  onClick={() => setProfile({...profile, experience: 'Intermediate'})}
                  icon="fitness_center"
                  title="Intermedio"
                  desc="6 meses a 2 años de entrenamiento estructurado."
                />
                <ChoiceCard 
                  active={profile.experience === 'Advanced'}
                  onClick={() => setProfile({...profile, experience: 'Advanced'})}
                  icon="military_tech"
                  title="Avanzado"
                  desc="Más de 2 años siguiendo un plan riguroso."
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-5xl font-black font-display tracking-tight">¿Dónde entrenarás?</h1>
              <p className="text-xl text-text-muted leading-relaxed max-w-2xl">La IA adaptará los ejercicios según el equipo disponible en tu entorno.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <EnvCard active={profile.environment === 'Gym'} onClick={() => setProfile({...profile, environment: 'Gym'})} icon="apartment" label="Gimnasio" />
                <EnvCard active={profile.environment === 'Home Full'} onClick={() => setProfile({...profile, environment: 'Home Full'})} icon="garage_home" label="Casa (Full)" />
                <EnvCard active={profile.environment === 'Home Min'} onClick={() => setProfile({...profile, environment: 'Home Min'})} icon="fitbit_weights" label="Casa (Min)" />
                <EnvCard active={profile.environment === 'Bodyweight'} onClick={() => setProfile({...profile, environment: 'Bodyweight'})} icon="accessibility_new" label="Solo Peso" />
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="fixed bottom-0 w-full p-8 bg-background-dark/95 backdrop-blur border-t border-border-dark flex justify-center">
        <div className="w-full max-w-4xl flex justify-between items-center px-4">
          <button onClick={() => setStep(Math.max(1, step - 1))} className={`font-black text-text-muted hover:text-white transition-all ${step === 1 ? 'invisible' : ''}`}>Volver</button>
          <div className="flex items-center gap-6">
            <p className="hidden md:block text-xs text-text-muted italic">"La constancia vence a la intensidad."</p>
            <button 
              onClick={nextStep}
              className="bg-primary hover:bg-[#0fd650] text-background-dark px-12 py-5 rounded-2xl font-black text-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-3"
            >
              Continuar <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const OptionCard = ({ active, onClick, icon, title, desc, img }: any) => (
  <button 
    onClick={onClick}
    className={`group relative flex flex-col gap-4 p-4 rounded-3xl transition-all text-left h-full ${active ? 'bg-primary/10 ring-2 ring-primary' : 'bg-surface-dark border border-border-dark hover:bg-[#233328] hover:border-primary/40'}`}
  >
    {active && <span className="absolute top-4 right-4 text-primary material-symbols-outlined fill-1">check_circle</span>}
    <div className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-md">
      <img src={img} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
    </div>
    <div>
      <h3 className="text-xl font-black font-display">{title}</h3>
      <p className="text-xs text-text-muted mt-1 leading-relaxed">{desc}</p>
    </div>
  </button>
);

const ChoiceCard = ({ active, onClick, icon, title, desc }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col gap-4 p-8 rounded-3xl transition-all text-left h-full ${active ? 'bg-primary/10 ring-2 ring-primary' : 'bg-surface-dark border border-border-dark hover:bg-[#233328]'}`}
  >
    <div className="flex justify-between items-start">
      <span className={`material-symbols-outlined text-4xl ${active ? 'text-primary' : 'text-text-muted'}`}>{icon}</span>
      <div className={`w-5 h-5 rounded-full border-2 ${active ? 'bg-primary border-primary' : 'border-border-dark'}`}></div>
    </div>
    <div>
      <h3 className="text-2xl font-black font-display mb-2">{title}</h3>
      <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
    </div>
  </button>
);

const EnvCard = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-4 p-6 h-40 rounded-3xl transition-all border ${active ? 'bg-primary/10 border-primary ring-1 ring-primary' : 'bg-surface-dark border-border-dark hover:border-primary/40'}`}
  >
    <span className={`material-symbols-outlined text-4xl ${active ? 'text-primary' : 'text-white'}`}>{icon}</span>
    <span className={`font-bold text-sm text-center ${active ? 'text-primary' : 'text-text-muted'}`}>{label}</span>
  </button>
);

export default Onboarding;
