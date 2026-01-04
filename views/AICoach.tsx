
import React, { useState, useRef, useEffect } from 'react';
import { AppView } from '../types';
import { getFitnessAdvice } from '../geminiService';

interface AICoachProps {
  onNavigate: (view: AppView) => void;
}

const AICoach: React.FC<AICoachProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Hola, soy tu coach DavidFit. ¿En qué puedo ayudarte hoy? Puedo analizar tu técnica, darte tips de nutrición o motivarte para tu próxima serie.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const response = await getFitnessAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Ups, tuve un problema conectando con mi base de conocimientos.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark">
      <header className="p-6 flex items-center justify-between border-b border-border-dark bg-[#0d120e] z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate(AppView.DASHBOARD)} className="material-symbols-outlined text-text-muted hover:text-white">arrow_back</button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
            <div>
              <h2 className="font-black text-xl font-display leading-tight">AI Coach</h2>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest">En línea • Basado en Ciencia</span>
            </div>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-6 rounded-3xl leading-relaxed text-lg ${m.role === 'user' ? 'bg-primary text-background-dark font-bold' : 'bg-surface-dark border border-border-dark text-white'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-surface-dark p-6 rounded-3xl flex gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-[#0d120e] border-t border-border-dark">
        <div className="max-w-3xl mx-auto relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta sobre tu entrenamiento o dieta..."
            className="w-full bg-surface-dark border border-border-dark rounded-3xl py-6 pl-8 pr-20 focus:ring-1 focus:ring-primary outline-none text-lg"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-background-dark rounded-2xl flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
          >
            <span className="material-symbols-outlined font-black">send</span>
          </button>
        </div>
        <p className="text-center text-[10px] text-text-muted mt-4 font-medium uppercase tracking-[0.2em]">DavidFit AI utiliza Google Search para información actualizada.</p>
      </div>
    </div>
  );
};

export default AICoach;
