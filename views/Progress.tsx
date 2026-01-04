
import React from 'react';
import { AppView } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

interface ProgressProps {
  onNavigate: (view: AppView) => void;
}

const data1RM = [
  { name: 'Sem 1', value: 95 },
  { name: 'Sem 2', value: 98 },
  { name: 'Sem 3', value: 102 },
  { name: 'Sem 4', value: 105 },
];

const dataVolume = [
  { name: 'Pierna', value: 45, color: '#13ec5b' },
  { name: 'Empuje', value: 35, color: '#0ea640' },
  { name: 'Tracción', value: 20, color: '#28392e' },
];

const Progress: React.FC<ProgressProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-screen bg-background-dark">
      <header className="p-6 flex items-center justify-between border-b border-border-dark bg-[#0d120e] z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate(AppView.DASHBOARD)} className="material-symbols-outlined text-text-muted hover:text-white">arrow_back</button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">monitoring</span>
            <h2 className="font-black text-xl font-display leading-tight">Progreso General</h2>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* KPI Header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPIItem label="Volumen Sem." value="12,450 kg" trend="+5%" icon="weight" />
            <KPIItem label="Racha Actual" value="14 días" trend="+2 días" icon="local_fire_department" />
            <KPIItem label="1RM Est. (Banca)" value="105 kg" trend="+2.5kg" icon="fitness_center" />
            <KPIItem label="Densidad" value="3.5 t/h" trend="+1.2%" icon="speed" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Strength Chart */}
            <div className="lg:col-span-2 bg-surface-dark p-8 rounded-[2.5rem] border border-border-dark space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black font-display tracking-tight">Fuerza Estimada (1RM)</h3>
                  <p className="text-sm text-text-muted">Calculado basado en tus mejores series semanales.</p>
                </div>
                <select className="bg-background-dark border-border-dark rounded-xl px-4 py-2 text-sm outline-none ring-1 ring-border-dark focus:ring-primary">
                  <option>Press de Banca</option>
                  <option>Sentadilla</option>
                </select>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data1RM}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#28392e" vertical={false} />
                    <XAxis dataKey="name" stroke="#9db9a6" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9db9a6" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1c271f', border: '1px solid #28392e', borderRadius: '12px' }}
                      itemStyle={{ color: '#13ec5b', fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#13ec5b" strokeWidth={4} dot={{ fill: '#13ec5b', strokeWidth: 4, r: 6 }} activeDot={{ r: 10, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Volume Distribution */}
            <div className="bg-surface-dark p-8 rounded-[2.5rem] border border-border-dark flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black font-display tracking-tight mb-2">Enfoque Muscular</h3>
                <p className="text-sm text-text-muted mb-8">Distribución de volumen en los últimos 30 días.</p>
                <div className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataVolume} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="#9db9a6" fontSize={12} width={80} tickLine={false} axisLine={false} />
                      <Tooltip cursor={false} contentStyle={{ backgroundColor: '#1c271f', border: 'none' }} />
                      <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                        {dataVolume.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20 flex gap-3 mt-4">
                <span className="material-symbols-outlined text-primary text-xl">info</span>
                <p className="text-[10px] text-primary-dark font-bold leading-relaxed uppercase tracking-widest">
                  Tu enfoque actual favorece el tren inferior. Considera aumentar tracción para balance.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-surface-dark p-8 rounded-[2.5rem] border border-border-dark">
                <h3 className="text-xl font-black mb-6">Consistencia Reciente</h3>
                <div className="grid grid-cols-7 gap-3">
                  {Array.from({length: 28}).map((_, i) => (
                    <div key={i} className={`aspect-square rounded-lg ${i % 3 === 0 ? 'bg-[#28392e]' : 'bg-primary'} ${i > 24 ? 'opacity-30' : ''}`}></div>
                  ))}
                </div>
             </div>
             <div className="bg-surface-dark p-8 rounded-[2.5rem] border border-border-dark space-y-4">
                <h3 className="text-xl font-black">Récords Recientes</h3>
                <div className="space-y-3">
                   <PRItem label="Press Banca" value="100 kg" sub="Hace 2 días" diff="+5 kg" />
                   <PRItem label="Sentadilla" value="140 kg" sub="Hace 1 semana" diff="+2.5 kg" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const KPIItem = ({ label, value, trend, icon }: any) => (
  <div className="bg-surface-dark p-6 rounded-3xl border border-border-dark flex flex-col gap-3">
    <div className="flex justify-between items-start">
      <div className="bg-background-dark p-3 rounded-2xl text-primary flex items-center justify-center">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-full">{trend}</span>
    </div>
    <div>
      <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="text-3xl font-black tracking-tighter">{value}</p>
    </div>
  </div>
);

const PRItem = ({ label, value, sub, diff }: any) => (
  <div className="flex items-center justify-between p-4 bg-background-dark/50 rounded-2xl border border-border-dark">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
        <span className="material-symbols-outlined text-lg">emoji_events</span>
      </div>
      <div>
        <p className="text-sm font-bold">{label}</p>
        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{sub}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-black text-lg">{value}</p>
      <p className="text-[10px] text-primary font-black uppercase tracking-widest">{diff}</p>
    </div>
  </div>
);

export default Progress;
