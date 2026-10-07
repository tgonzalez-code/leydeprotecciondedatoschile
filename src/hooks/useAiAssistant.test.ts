import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAiAssistant } from './useAiAssistant';
import * as geminiService from '../../services/geminiService';

describe('hooks/useAiAssistant', () => {
  it('inicializa con el mensaje inicial de bienvenida y campo input vacío', () => {
    const { result } = renderHook(() => useAiAssistant());

    expect(result.current.mensajes.length).toBe(1);
    expect(result.current.mensajes[0].remitente).toBe('asistente');
    expect(result.current.input).toBe('');
    expect(result.current.cargando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('permite actualizar el campo input', () => {
    const { result } = renderHook(() => useAiAssistant());

    act(() => {
      result.current.setInput('¿Cuáles son las multas leves?');
    });

    expect(result.current.input).toBe('¿Cuáles son las multas leves?');
  });

  it('agrega mensaje del usuario y respuesta exitosa del servicio de IA', async () => {
    vi.spyOn(geminiService, 'getAiResponse').mockResolvedValueOnce(
      'Las multas leves van hasta 5.000 UTM conforme a la Ley 21.719.'
    );

    const { result } = renderHook(() => useAiAssistant());

    await act(async () => {
      await result.current.enviarMensaje('¿Cuáles son las multas leves?');
    });

    expect(result.current.mensajes.length).toBe(3);
    // Mensaje 1: Inicial
    // Mensaje 2: Usuario
    expect(result.current.mensajes[1].remitente).toBe('usuario');
    expect(result.current.mensajes[1].texto).toBe('¿Cuáles son las multas leves?');
    // Mensaje 3: Asistente
    expect(result.current.mensajes[2].remitente).toBe('asistente');
    expect(result.current.mensajes[2].texto).toContain('5.000 UTM');
    expect(result.current.cargando).toBe(false);
  });

  it('maneja errores con fallback legal en caso de fallo en el servicio', async () => {
    vi.spyOn(geminiService, 'getAiResponse').mockRejectedValueOnce(
      new Error('API quota exceeded')
    );

    const { result } = renderHook(() => useAiAssistant());

    await act(async () => {
      await result.current.enviarMensaje('Pregunta con error');
    });

    expect(result.current.mensajes.length).toBe(3);
    expect(result.current.mensajes[2].remitente).toBe('asistente');
    expect(result.current.mensajes[2].texto).toContain('Interrupción temporal');
    expect(result.current.cargando).toBe(false);
  });

  it('permite reiniciar el chat al mensaje original', async () => {
    vi.spyOn(geminiService, 'getAiResponse').mockResolvedValueOnce('Respuesta prueba');

    const { result } = renderHook(() => useAiAssistant());

    await act(async () => {
      await result.current.enviarMensaje('Hola');
    });

    expect(result.current.mensajes.length).toBe(3);

    act(() => {
      result.current.reiniciarChat();
    });

    expect(result.current.mensajes.length).toBe(1);
    expect(result.current.input).toBe('');
    expect(result.current.cargando).toBe(false);
  });
});
