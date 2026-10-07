import { useState, useCallback } from 'react';
import { getAiResponse } from '../../services/geminiService';
import { MensajeChat } from '../../types';
import { MENSAJE_INICIAL_CHAT } from '../../content/chat';

export interface UseAiAssistantOptions {
  initialMessage?: MensajeChat;
  onErrorFallbackText?: string;
}

export interface UseAiAssistantReturn {
  // State
  mensajes: MensajeChat[];
  input: string;
  cargando: boolean;
  error: string | null;

  // Actions
  setInput: (input: string) => void;
  enviarMensaje: (textoAEnviar?: string) => Promise<void>;
  reiniciarChat: () => void;
  agregarMensaje: (mensaje: MensajeChat) => void;
}

const DEFAULT_ERROR_FALLBACK =
  'Interrupción temporal. Recuerda que para evitar multas de la APDP, el primer paso es contar con tu Registro de Actividades de Tratamiento (RAT - Art. 14 ter). ¿Quieres que generemos tu RAT en 3 minutos?';

/**
 * Hook para gestionar el estado conversacional con el Asistente de IA (Gemini).
 * Desacopla la lógica de mensajes, estado de carga, y llamadas al servicio de IA
 * del componente modal de presentación.
 */
export function useAiAssistant(options: UseAiAssistantOptions = {}): UseAiAssistantReturn {
  const initialMessage = options.initialMessage ?? MENSAJE_INICIAL_CHAT;
  const [mensajes, setMensajes] = useState<MensajeChat[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agregarMensaje = useCallback((mensaje: MensajeChat) => {
    setMensajes((prev) => [...prev, mensaje]);
  }, []);

  const reiniciarChat = useCallback(() => {
    setMensajes([initialMessage]);
    setInput('');
    setCargando(false);
    setError(null);
  }, [initialMessage]);

  const enviarMensaje = useCallback(
    async (textoAEnviar?: string) => {
      const texto = (textoAEnviar !== undefined ? textoAEnviar : input).trim();
      if (!texto || cargando) return;

      setInput('');
      setError(null);

      const timestamp = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      const userMsg: MensajeChat = {
        id: `user-${Date.now()}`,
        remitente: 'usuario',
        texto,
        timestamp,
      };

      setMensajes((prev) => [...prev, userMsg]);
      setCargando(true);

      try {
        const respuesta = await getAiResponse(texto);
        const assistantMsg: MensajeChat = {
          id: `asistente-${Date.now()}`,
          remitente: 'asistente',
          texto: respuesta,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMensajes((prev) => [...prev, assistantMsg]);
      } catch (err) {
        const errMsgText =
          err instanceof Error
            ? err.message
            : (options.onErrorFallbackText ?? DEFAULT_ERROR_FALLBACK);
        setError(errMsgText);

        const errorMsg: MensajeChat = {
          id: `asistente-${Date.now()}`,
          remitente: 'asistente',
          texto: options.onErrorFallbackText ?? DEFAULT_ERROR_FALLBACK,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMensajes((prev) => [...prev, errorMsg]);
      } finally {
        setCargando(false);
      }
    },
    [input, cargando, options.onErrorFallbackText]
  );

  return {
    mensajes,
    input,
    cargando,
    error,
    setInput,
    enviarMensaje,
    reiniciarChat,
    agregarMensaje,
  };
}
