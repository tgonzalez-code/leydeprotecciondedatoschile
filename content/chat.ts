import { MensajeChat } from '../types';

export const PREGUNTAS_RAPIDAS_CHAT = [
  '¿Qué multas arriesga mi empresa bajo la Ley 21.719?',
  '¿Qué es el RAT (Art. 14 ter) y por qué es obligatorio?',
  '¿Cómo beneficia el Estatuto Pyme (Ley 20.416) a mi negocio?',
  '¿Cuáles son los plazos para responder derechos ARCO+?',
  '¿Cómo evalúo los datos de mi empresa en 3 minutos?',
];

export const MENSAJE_INICIAL_CHAT: MensajeChat = {
  id: 'init-1',
  remitente: 'asistente',
  texto: `¡Hola! Soy el **Asistente Oficial de leydedatospersonaleschile.cl**. 

Mi misión es ayudarte a cumplir con la nueva **Ley 21.719 de Protección de Datos Personales en Chile** bajo nuestro principio rector: **"Cumplir sin frenar el negocio"**.

El paso 1 obligatorio que fiscalizará la Agencia de Protección de Datos Personales (APDP) es el **Tramo 1: Registro de Actividades de Tratamiento (RAT - Art. 14 ter)**. Sin él, tu Pyme no puede defenderse ni justificar sus tratamientos.

¿Quieres que evaluemos en 3 minutos qué datos maneja tu empresa y generemos tu RAT inicial?`,
  timestamp: '09:00',
  sugerencias: PREGUNTAS_RAPIDAS_CHAT,
};
