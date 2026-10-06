
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAiResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "Eres el asistente inteligente de GenBeta 2026. Tu estilo es futurista, disruptivo, directo y profesional. Hablas de tecnología, código líquido, arquitectura evolutiva y rendimiento extremo. GenBeta es una consultora boutique de alta tecnología fundada en Chile que opera a nivel global. Responde en español de forma inspiradora.",
        temperature: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lo siento, la red neuronal de GenBeta está experimentando una singularidad momentánea. Inténtalo de nuevo.";
  }
};
