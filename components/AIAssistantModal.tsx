import React, { useState, useRef, useEffect } from 'react';
import { getAiResponse } from '../services/geminiService';
import { MensajeChat } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToRat: () => void;
}

const PREGUNTAS_RAPIDAS = [
  '¿Qué multas arriesga mi empresa bajo la Ley 21.719?',
  '¿Qué es el RAT (Art. 14 ter) y por qué es obligatorio?',
  '¿Cómo beneficia el Estatuto Pyme (Ley 20.416) a mi negocio?',
  '¿Cuáles son los plazos para responder derechos ARCO+?',
  '¿Cómo evalúo los datos de mi empresa en 3 minutos?',
];

const MENSAJE_INICIAL: MensajeChat = {
  id: 'init-1',
  remitente: 'asistente',
  texto: `¡Hola! Soy el **Asistente Oficial de leydedatospersonaleschile.cl**. 

Mi misión es ayudarte a cumplir con la nueva **Ley 21.719 de Protección de Datos Personales en Chile** bajo nuestro principio rector: **"Cumplir sin frenar el negocio"**.

El paso 1 obligatorio que fiscalizará la Agencia de Protección de Datos Personales (APDP) es el **Tramo 1: Registro de Actividades de Tratamiento (RAT - Art. 14 ter)**. Sin él, tu Pyme no puede defenderse ni justificar sus tratamientos.

¿Quieres que evaluemos en 3 minutos qué datos maneja tu empresa y generemos tu RAT inicial?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  sugerencias: PREGUNTAS_RAPIDAS,
};

const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose, onGoToRat }) => {
  const [mensajes, setMensajes] = useState<MensajeChat[]>([MENSAJE_INICIAL]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes, cargando]);

  if (!isOpen) return null;

  const handleEnviar = async (textoAEnviar?: string) => {
    const texto = (textoAEnviar || input).trim();
    if (!texto || cargando) return;

    setInput('');
    const userMsg: MensajeChat = {
      id: `user-${Date.now()}`,
      remitente: 'usuario',
      texto,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMensajes((prev) => [...prev, userMsg]);
    setCargando(true);

    try {
      const respuesta = await getAiResponse(texto);
      const assistantMsg: MensajeChat = {
        id: `asistente-${Date.now()}`,
        remitente: 'asistente',
        texto: respuesta,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMensajes((prev) => [...prev, assistantMsg]);
    } catch (e) {
      const errorMsg: MensajeChat = {
        id: `asistente-${Date.now()}`,
        remitente: 'asistente',
        texto: 'Interrupción temporal. Recuerda que para evitar multas de la APDP, el primer paso es contar con tu Registro de Actividades de Tratamiento (RAT - Art. 14 ter). ¿Quieres que generemos tu RAT en 3 minutos?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMensajes((prev) => [...prev, errorMsg]);
    } finally {
      setCargando(false);
    }
  };

  const handleIrARAT = () => {
    onClose();
    onGoToRat();
  };

  const renderTexto = (txt: string) => {
    return txt.split('\n').map((line, i) => {
      const partes = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className={line.trim().startsWith('•') || line.trim().startsWith('-') ? 'pl-2 my-1' : 'my-1'}>
          {partes.map((p, j) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return <strong key={j} className="font-bold text-zinc-950">{p.slice(2, -2)}</strong>;
            }
            return p;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
      <div className="w-full max-w-2xl bg-white border-2 border-zinc-900 rounded-3xl overflow-hidden flex flex-col shadow-2xl h-[86vh] max-h-[720px]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b-2 border-zinc-900 flex justify-between items-center bg-zinc-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-lg">smart_toy</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-sm sm:text-base text-white">
                  Asistente Ley 21.719 & Agente RAT
                </h3>
                <span className="bg-orange-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ACTIVO
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono">
                leydedatospersonaleschile.cl • Especialista APDP
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Banner CTA */}
        <div className="bg-orange-500 text-white px-4 py-2 flex items-center justify-between gap-3 text-xs font-mono font-bold">
          <span>Tramo 1 Obligatorio: "Cumplir sin frenar"</span>
          <button
            onClick={handleIrARAT}
            className="bg-zinc-950 hover:bg-zinc-800 text-white px-3 py-1 rounded-lg text-[11px] shadow-sm"
          >
            Abrir Agente RAT (3 min) →
          </button>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm bg-zinc-50">
          {mensajes.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.remitente === 'usuario' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl leading-relaxed ${
                  m.remitente === 'usuario'
                    ? 'bg-zinc-950 text-white rounded-tr-none shadow-md'
                    : 'bg-white text-zinc-800 rounded-tl-none border-2 border-zinc-200 shadow-md'
                }`}
              >
                <div className={m.remitente === 'usuario' ? 'text-white' : 'text-zinc-800'}>
                  {renderTexto(m.texto)}
                </div>
                
                <span className={`block text-[9px] mt-1.5 font-mono ${
                  m.remitente === 'usuario' ? 'text-zinc-400 text-right' : 'text-zinc-400'
                }`}>
                  {m.timestamp}
                </span>

                {/* Suggestions */}
                {m.sugerencias && (
                  <div className="mt-3 pt-3 border-t border-zinc-200 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-wider block">
                      Preguntas frecuentes sugeridas:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.sugerencias.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleEnviar(s)}
                          className="bg-zinc-50 hover:bg-orange-50 hover:border-orange-500 border border-zinc-300 text-zinc-900 text-xs px-2.5 py-1.5 rounded-lg text-left transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {cargando && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-zinc-200 p-3.5 rounded-2xl rounded-tl-none text-zinc-700 text-xs flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                <span>Consultando normativa Ley 21.719...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t-2 border-zinc-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEnviar()}
              placeholder="Pregúntale al experto sobre multas, plazos ARCO+ o el RAT..."
              className="flex-1 bg-zinc-50 border-2 border-zinc-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-950 focus:border-orange-500 focus:outline-none"
            />
            <button
              onClick={() => handleEnviar()}
              disabled={cargando || !input.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold px-5 rounded-xl flex items-center justify-center transition-all shadow-md shadow-orange-500/25"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </div>
          
          <div className="mt-2 text-center text-[10px] text-zinc-500 font-mono">
            Orientación técnica y operativa sobre Ley 21.719. Para asuntos judiciales específicos, consulte asesoría legal.
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIAssistantModal;
