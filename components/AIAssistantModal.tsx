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

Mi objetivo es ayudarte a entender y cumplir con la nueva **Ley 21.719 de Protección de Datos Personales en Chile** bajo nuestro principio rector: **"Cumplir sin frenar el negocio"**.

¿Sabías que el primer paso obligatorio que fiscalizará la Agencia de Protección de Datos Personales (APDP) es el **Tramo 1: Registro de Actividades de Tratamiento (RAT - Art. 14 ter)**?

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
        texto: 'Ha ocurrido una interrupción. Recuerda que para evitar multas de la APDP, el primer paso es contar con tu Registro de Actividades de Tratamiento (RAT - Art. 14 ter). ¿Quieres que evaluemos en 3 minutos qué datos maneja tu empresa y generemos tu RAT inicial?',
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
              return <strong key={j} className="font-bold text-slate-900">{p.slice(2, -2)}</strong>;
            }
            return p;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4">
      <div className="w-full max-w-2xl bg-white border border-slate-300 rounded-2xl overflow-hidden flex flex-col shadow-2xl h-[86vh] max-h-[720px]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-base">smart_toy</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  Asistente Ley 21.719 & Agente RAT
                </h3>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono px-1.5 py-0.2 rounded font-bold">
                  En línea
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono">
                leydedatospersonaleschile.cl • Especialista APDP
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 flex items-center justify-center transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* Quick RAT Banner CTA */}
        <div className="bg-blue-50/80 px-4 py-2 border-b border-blue-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-blue-950 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Tramo 1 Obligatorio: "Cumplir sin frenar"</span>
          </div>
          <button
            onClick={handleIrARAT}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-3 py-1 rounded-md text-[11px] shadow-sm"
          >
            Abrir Agente RAT (3 min) →
          </button>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 text-xs">
          {mensajes.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.remitente === 'usuario' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-xl leading-relaxed ${
                  m.remitente === 'usuario'
                    ? 'bg-blue-900 text-white rounded-tr-none shadow-sm'
                    : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
                }`}
              >
                <div className={m.remitente === 'usuario' ? 'text-white' : 'text-slate-800'}>
                  {renderTexto(m.texto)}
                </div>
                
                <span className={`block text-[9px] mt-1 font-mono ${
                  m.remitente === 'usuario' ? 'text-blue-200 text-right' : 'text-slate-400'
                }`}>
                  {m.timestamp}
                </span>

                {/* Suggestions Pills if present */}
                {m.sugerencias && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                      Preguntas sugeridas:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {m.sugerencias.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleEnviar(s)}
                          className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-[11px] px-2 py-1 rounded-md text-left transition-colors"
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
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl rounded-tl-none text-slate-600 text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900 animate-ping"></span>
                <span>Consultando normativa Ley 21.719...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEnviar()}
              placeholder="Escribe tu consulta sobre multas, plazos ARCO+ o el RAT..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-900"
            />
            <button
              onClick={() => handleEnviar()}
              disabled={cargando || !input.trim()}
              className="bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white font-bold px-3.5 rounded-lg flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </div>
          
          <div className="mt-1.5 text-center text-[10px] text-slate-500">
            Orientación técnica y operativa sobre Ley 21.719. Para litigios específicos, consulte validación jurídica.
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIAssistantModal;
