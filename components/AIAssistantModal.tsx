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
        texto: 'Ha ocurrido una interrupción en el enlace. Recuerda que para evitar multas de la APDP, el primer paso es contar con tu Registro de Actividades de Tratamiento (RAT - Art. 14 ter). ¿Quieres que generemos tu RAT en 3 minutos?',
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

  // Formateador simple de negritas y listas
  const renderTexto = (txt: string) => {
    return txt.split('\n').map((line, i) => {
      // Reemplazo simple de **texto**
      const partes = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className={line.trim().startsWith('•') || line.trim().startsWith('-') ? 'pl-2 my-1' : 'my-1'}>
          {partes.map((p, j) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return <strong key={j} className="text-white font-bold">{p.slice(2, -2)}</strong>;
            }
            return p;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4">
      <div className="w-full max-w-2xl bg-[#091329] border border-blue-700/60 rounded-3xl overflow-hidden flex flex-col shadow-2xl h-[88vh] max-h-[750px]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-blue-900/50 flex justify-between items-center bg-gradient-to-r from-[#0d1d42] via-[#091533] to-[#0d1d42]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#08122c] rounded-[10px] flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-400 text-xl">smart_toy</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                  Asistente Ley 21.719 & Agente RAT
                </h3>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  En línea
                </span>
              </div>
              <p className="text-[11px] text-blue-300">
                leydedatospersonaleschile.cl • Especialista Regulatorio APDP
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Quick RAT Banner CTA */}
        <div className="bg-gradient-to-r from-blue-950/90 to-indigo-950/90 px-4 py-2 border-b border-blue-900/40 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <span className="material-symbols-outlined text-amber-400 text-base">verified</span>
            <span>Tramo 1 Obligatorio: "Cumplir sin frenar"</span>
          </div>
          <button
            onClick={handleIrARAT}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1 rounded-lg text-[11px] shadow transition-transform hover:scale-105"
          >
            Abrir Agente RAT (3 min) →
          </button>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          {mensajes.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.remitente === 'usuario' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl leading-relaxed ${
                  m.remitente === 'usuario'
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/30'
                    : 'bg-[#0f1f45] text-slate-200 rounded-tl-none border border-blue-900/70 shadow-md'
                }`}
              >
                <div className="text-slate-100">
                  {renderTexto(m.texto)}
                </div>
                
                <span className={`block text-[9px] mt-1 font-mono ${
                  m.remitente === 'usuario' ? 'text-blue-200 text-right' : 'text-slate-400'
                }`}>
                  {m.timestamp}
                </span>

                {/* Suggestions Pills if present */}
                {m.sugerencias && (
                  <div className="mt-3 pt-3 border-t border-blue-800/40 space-y-1.5">
                    <span className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold block">
                      Preguntas frecuentes sugeridas:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.sugerencias.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleEnviar(s)}
                          className="bg-[#08122c] hover:bg-blue-900/60 border border-blue-700/50 text-blue-200 text-[11px] px-2.5 py-1 rounded-lg text-left transition-colors"
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
              <div className="bg-[#0f1f45] border border-blue-900/70 p-3.5 rounded-2xl rounded-tl-none text-slate-300 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                <span>Consultando normativa Ley 21.719 y precedentes APDP...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-blue-900/60 bg-[#070e22]">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEnviar()}
              placeholder="Pregúntale al experto sobre multas, plazos ARCO+ o el RAT..."
              className="flex-1 bg-[#0b1633] border border-blue-900/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={() => handleEnviar()}
              disabled={cargando || !input.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold px-4 rounded-xl flex items-center justify-center transition-all shadow-md shadow-blue-600/30"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </div>
          
          <div className="mt-2 text-center text-[10px] text-slate-500">
            Orientación técnica y operativa sobre Ley 21.719 en Chile. Para litigios específicos, consulte validación jurídica.
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIAssistantModal;
