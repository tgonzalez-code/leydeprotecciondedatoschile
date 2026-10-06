
import React, { useState, useRef, useEffect } from 'react';
import { getAiResponse } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const AIAssistant: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Bienvenido al protocolo 2026 de GenBeta. ¿Cómo podemos acelerar tu visión hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getAiResponse(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', text: response || 'Error en la conexión.' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl bg-void border border-primary/30 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-acid-green rounded-full animate-pulse"></div>
            <h3 className="font-bold uppercase tracking-widest text-primary">GenBeta AI Core</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[60vh] min-h-[400px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                m.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-white/10 text-zinc-100 rounded-tl-none border border-white/10'
              }`}>
                <p className="text-sm leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none animate-pulse text-zinc-400 text-xs uppercase tracking-widest font-bold">
                Procesando datos...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/10 bg-black/40">
          <div className="flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu consulta disruptiva..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:border-primary transition-colors text-white placeholder:text-zinc-600"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="w-14 h-14 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all disabled:opacity-50 shadow-lg"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
