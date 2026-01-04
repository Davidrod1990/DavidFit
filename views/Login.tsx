
import React from 'react';

interface LoginProps {
  onLogin: () => void;
  onRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="flex h-screen w-full flex-col lg:flex-row overflow-hidden">
      {/* Left Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-background-dark items-center justify-center">
        <div className="absolute inset-0 bg-center bg-cover transition-transform duration-[20s] hover:scale-105 opacity-60" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=2069")' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
        <div className="relative z-10 p-16 max-w-2xl flex flex-col justify-end h-full pb-32">
          <div className="w-16 h-1 bg-primary mb-6 rounded-full"></div>
          <h2 className="text-6xl font-black leading-tight mb-4 drop-shadow-lg font-display">
            La constancia es<br/>
            <span className="text-primary italic">tu superpoder.</span>
          </h2>
          <p className="text-xl text-text-muted font-light leading-relaxed max-w-md">
            Únete a DavidFit y descubre cómo la ciencia del comportamiento puede reprogramar tus hábitos para siempre.
          </p>
          <div className="mt-10 flex gap-4">
            <Badge icon="science" label="Basado en Ciencia" />
            <Badge icon="check_circle" label="Resultados Reales" />
          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col bg-background-dark overflow-y-auto px-6 py-12 md:p-16 lg:p-24 items-center justify-center">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-primary mb-8">
              <span className="material-symbols-outlined text-4xl">fitness_center</span>
              <span className="text-3xl font-black tracking-tighter">DavidFit</span>
            </div>
            <h1 className="text-4xl font-bold mb-3 font-display">Bienvenido de nuevo</h1>
            <p className="text-text-muted">Ingresa tus credenciales para acceder a tu plan.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted px-1">Email o Usuario</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted group-focus-within:text-primary transition-colors">mail</span>
                <input 
                  type="email" 
                  className="w-full bg-surface-dark border border-border-dark rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-medium text-text-muted">Contraseña</label>
                <button type="button" className="text-xs text-primary hover:underline">¿Olvidaste tu contraseña?</button>
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted group-focus-within:text-primary transition-colors">lock</span>
                <input 
                  type="password" 
                  className="w-full bg-surface-dark border border-border-dark rounded-2xl py-4 pl-12 pr-12 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted hover:text-white transition-colors">visibility</button>
              </div>
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-[#0fd650] text-background-dark font-black py-5 rounded-2xl transition-all shadow-[0_4px_20px_rgba(19,236,91,0.3)] hover:scale-[1.01] active:scale-100 flex items-center justify-center gap-2 text-lg">
              Ingresar ahora <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-dark"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background-dark px-4 text-text-muted tracking-widest font-bold">O inicia con</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SocialButton icon="https://www.google.com/favicon.ico" label="Google" />
            <SocialButton icon="https://www.apple.com/favicon.ico" label="Apple" />
          </div>

          <p className="text-center text-sm text-text-muted pt-4">
            ¿Aún no eres miembro? <button onClick={onRegister} className="text-primary font-bold hover:underline ml-1">Crear cuenta gratis</button>
          </p>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ icon, label }: { icon: string, label: string }) => (
  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
    <span className="material-symbols-outlined text-primary text-sm">{icon}</span>
    <span className="text-xs font-bold tracking-wide uppercase text-white">{label}</span>
  </div>
);

const SocialButton = ({ icon, label }: { icon: string, label: string }) => (
  <button className="flex items-center justify-center gap-2 py-4 rounded-2xl border border-border-dark bg-surface-dark hover:bg-[#233328] transition-all group">
    <img src={icon} className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt={label} />
    <span className="font-bold text-sm">{label}</span>
  </button>
);

export default Login;
