import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
[SYSTEM INSTRUCTION: ASISTENTE WEB LEYDEDATOSPERSONALESCHILE.CL & AGENTE RAT]

1. IDENTIDAD Y PROPÓSITO:
Eres el asistente virtual interactivo del sitio web "leydedatospersonaleschile.cl". Tu misión es doble:
- Educar de manera simple, rigurosa y directa a dueños de Pymes, gerentes y profesionales en Chile sobre las exigencias de la nueva Ley 21.719 de Protección de Datos Personales.
- Posicionar y convertir a los usuarios invitándolos a utilizar nuestro "Agente de IA para el Registro de Actividades de Tratamiento (RAT)", la solución que permite "Cumplir sin frenar el negocio".

2. TONO Y ESTILO:
- Tono: Experto en regulación chilena, cercano, empático con el empresario y altamente orientado a la acción.
- Evita el lenguaje legal excesivamente denso o alarmista sin fundamento. Habla de riesgos reales pero enfócate en soluciones ágiles.
- Siempre conecta la teoría legal con la practicidad operativa de una Pyme chilena.

3. CONOCIMIENTO BASE DE LA LEY 21.719 (CHILE):
- Objeto y Alcance: Modifica sustancialmente la Ley 19.628. Aplica a TODAS las empresas en Chile que traten datos personales de clientes, trabajadores o proveedores.
- Entidad Fiscalizadora: Agencia de Protección de Datos Personales (APDP).
- Régimen de Sanciones:
  * Infracciones Leves: Hasta 5.000 UTM (aprox. $330 millones CLP).
  * Infracciones Graves: Hasta 10.000 UTM (aprox. $660 millones CLP).
  * Infracciones Gravísimas: Hasta 20.000 UTM (aprox. $1.320 millones CLP) o entre el 2% y 4% de los ingresos anuales de la empresa en caso de reincidencia.
- Beneficio Pyme (Ley 20.416 - Estatuto Pyme): La primera infracción puede ser sancionada con amonestación escrita, siempre que la empresa no sea reincidente y acredite regularizar inmediatamente. Para regularizar, la APDP exigirá de inmediato el RAT.
- Derechos ARCO+: Acceso, Rectificación, Supresión, Oposición, Portabilidad y Bloqueo Temporal.
  * SLA crítico de Bloqueo Temporal: 2 días hábiles (el plazo más exigente).
  * SLA para el resto de Derechos ARCO+: 30 días corridos para dar respuesta formal y motivada.
- EL PASO 1 OBLIGATORIO (TRAMO 1 - ART. 14 TER): El Registro de Actividades de Tratamiento (RAT). Ninguna empresa puede proteger datos, redactar políticas creíbles ni responder solicitudes si no sabe qué datos tiene, dónde están guardados, para qué los usa y cuál es su base de licitud (consentimiento, contrato, ley o interés legítimo).

4. OFERTA DE VALOR DEL AGENTE DE IA (TRAMO 1):
- Concepto: "Cumplir sin frenar" — Reemplaza consultorías tradicionales de meses y honorarios millonarios por una entrevista conversacional inteligente de 3 minutos.
- Funcionalidades del Agente:
  1. Realiza preguntas simples de negocio sobre los datos que maneja la Pyme (CRM, planillas de sueldos, RRHH, clientes, ecommerce, videovigilancia).
  2. Clasifica automáticamente datos personales y datos de categorías especiales/sensibles (salud, biométricos, RUT, datos socioeconómicos).
  3. Asigna la base de licitud correspondiente a cada tratamiento (Art. 12 y Art. 13 de la Ley).
  4. Genera y exporta en minutos la ficha oficial del Registro de Actividades de Tratamiento (RAT) en JSON y PDF descargable para presentar ante la APDP (Art. 14 ter).

5. REGLAS Y ESTRUCTURA DE RESPUESTA:
- Cuando pregunten sobre la ley, multas o plazos: Responde con datos precisos de la Ley 21.719, pero concluye siempre explicando que el primer paso práctico para evitar sanciones es contar con el RAT (Tramo 1).
- Cuando pregunten cómo empezar o adaptarse: Explica la importancia del Tramo 1 e invita directamente a hacer la prueba gratuita con el Agente de IA en la web.
- Llamados a la Acción (CTA) al final de las respuestas: Invita al usuario a interactuar diciendo frases como:
  * "¿Quieres que evaluemos en 3 minutos qué datos maneja tu empresa y generemos tu RAT inicial?"
  * "Prueba nuestro Agente de IA para construir tu Registro de Actividades de Tratamiento hoy mismo."
- Descargo de Responsabilidad: Si la consulta exige una interpretación judicial o litigio complejo, añade brevemente: "Esta plataforma brinda orientación técnica y operativa sobre la Ley 21.719. Para asuntos contenciosos específicos, siempre se recomienda validación jurídica."
`;

// Helper for realistic fallback responses if API key is unconfigured or rate limited
function getFallbackKnowledgeResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  
  if (p.includes('multa') || p.includes('sancion') || p.includes('utm') || p.includes('cuanto cuesta')) {
    return `La nueva Ley 21.719 introduce un régimen de sanciones muy estricto fiscalizado por la nueva **Agencia de Protección de Datos Personales (APDP)**:

• **Infracciones Leves:** Hasta 5.000 UTM (~$330.000.000 CLP).
• **Infracciones Graves:** Hasta 10.000 UTM (~$660.000.000 CLP).
• **Infracciones Gravísimas:** Hasta 20.000 UTM (~$1.320.000.000 CLP) o entre el 2% y 4% de las ventas anuales en reincidencia.

💡 **Beneficio Pyme (Ley 20.416):** Si tu empresa califica como Pyme, la primera infracción puede conmutarse por una amonestación escrita, siempre que regularices de inmediato. Y el primer documento que te exigirá la APDP para regularizar es tu **Registro de Actividades de Tratamiento (RAT - Art. 14 ter)**.

¿Quieres que evaluemos en 3 minutos qué datos maneja tu empresa y generemos tu RAT inicial?`;
  }

  if (p.includes('rat') || p.includes('tramo 1') || p.includes('art. 14') || p.includes('registro') || p.includes('que es')) {
    return `El **Registro de Actividades de Tratamiento (RAT)** es el requisito obligatorio del **Art. 14 ter** de la Ley 21.719. En términos simples, es el inventario maestro donde tu empresa declara:

1. **Qué datos recopila:** Nombres, RUT, emails, datos laborales, bancarios o biométricos.
2. **Para qué fin:** Pago de remuneraciones, emisión de boletas/facturas, CRM o marketing.
3. **Cuál es su base de licitud:** Consentimiento (Art. 12), ejecución de contrato (Art. 13 letra a), o mandato legal.
4. **Dónde se almacenan y cuánto tiempo se guardan.**

Sin el RAT (Tramo 1), ninguna Pyme puede responder solicitudes ARCO+ ni acreditar cumplimiento ante una fiscalización de la APDP.

Con nuestro **Agente de IA**, puedes construir y descargar tu ficha oficial RAT en solo 3 minutos. ¿Te gustaría comenzar la evaluación ahora?`;
  }

  if (p.includes('arco') || p.includes('derecho') || p.includes('plazo') || p.includes('sla') || p.includes('bloqueo')) {
    return `La Ley 21.719 consagra los derechos **ARCO+** para todos los titulares de datos en Chile:

• **Acceso:** Conocer qué datos tuyos tiene la empresa.
• **Rectificación:** Corregir datos erróneos o desactualizados.
• **Supresión (Borrado):** Eliminar datos cuando ya no haya base legal.
• **Oposición:** Oponerse a tratamientos como prospección comercial.
• **Portabilidad:** Traspasar tus datos a otro proveedor en formato estándar.
• **Bloqueo Temporal:** Impedir temporalmente el uso mientras se dirime un reclamo.

⏱️ **Plazos de respuesta (SLAs legales):**
- **Bloqueo Temporal:** Plazo ultra estricto de **2 días hábiles**.
- **Acceso, Rectificación, Supresión, Oposición y Portabilidad:** **30 días corridos**.

Para poder responder a tiempo, es imprescindible tener mapeados los datos en el RAT. Prueba nuestro Agente de IA para construir tu Registro de Actividades de Tratamiento hoy mismo.`;
  }

  if (p.includes('pyme') || p.includes('pequeña') || p.includes('empresa') || p.includes('aplica')) {
    return `¡Sí, aplica al 100%! La Ley 21.719 rige para **toda persona natural o jurídica en Chile que trate datos personales**, sin importar si tienes 2 trabajadores o 500.

Si emites facturas con RUT, tienes trabajadores con contrato o fichas de clientes en Excel o WhatsApp, estás tratando datos.

La buena noticia para las Pymes:
1. Aplica el beneficio de la Ley 20.416 (Estatuto Pyme) para amonestación en primera falta.
2. No necesitas pagar millones en consultorías legales tradicionales: nuestro concepto **"Cumplir sin frenar"** te permite resolver el Tramo 1 obligatorio (RAT - Art. 14 ter) en 3 minutos.

¿Quieres que evaluemos en 3 minutos qué datos maneja tu empresa y generemos tu RAT inicial?`;
  }

  return `Hola. En **leydedatospersonaleschile.cl** ayudamos a dueños de Pymes y directivos a cumplir con las exigencias de la nueva **Ley 21.719** de forma ágil y práctica, bajo la premisa de **"Cumplir sin frenar el negocio"**.

El primer paso obligatorio exigido por la Agencia de Protección de Datos Personales (APDP) es el **Tramo 1: Registro de Actividades de Tratamiento (RAT - Art. 14 ter)**. Sin este inventario de datos y bases de licitud, una empresa queda expuesta a multas de hasta 20.000 UTM.

Puedes consultarme sobre:
• Multas y fiscalización de la APDP
• Beneficios para Pymes (Ley 20.416)
• Tiempos de respuesta para Derechos ARCO+ (2 días y 30 días)
• Cómo generar tu ficha RAT oficial

Prueba nuestro Agente de IA para construir tu Registro de Actividades de Tratamiento hoy mismo.`;
}

export const getAiResponse = async (prompt: string, conversationHistory: { role: string; content: string }[] = []): Promise<string> => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';

  if (!apiKey) {
    return getFallbackKnowledgeResponse(prompt);
  }

  try {
    const ai = new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text || text.trim() === '') {
      return getFallbackKnowledgeResponse(prompt);
    }
    return text;
  } catch (error) {
    console.warn("Fallo en llamada a Gemini API, usando motor de conocimiento regulatorio Ley 21.719:", error);
    return getFallbackKnowledgeResponse(prompt);
  }
};
