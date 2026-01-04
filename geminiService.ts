
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFitnessAdvice = async (query: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
      systemInstruction: "Eres DavidFit AI, un entrenador experto en fisiología del ejercicio y ciencia del comportamiento. Proporcionas respuestas basadas en evidencia científica, motivadoras y precisas."
    },
  });
  return response.text || "Lo siento, no pude procesar tu solicitud.";
};

export const generateWorkoutImage = async (prompt: string, size: '1K' | '2K' | '4K' = '1K'): Promise<string | null> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: `High quality cinematic fitness photography: ${prompt}. Dark atmospheric gym lighting, green accents.` }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: size
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Image generation failed", error);
  }
  return null;
};

export const analyzeProgress = async (stats: any): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analiza este progreso del usuario y da un tip de comportamiento breve: ${JSON.stringify(stats)}`,
    config: {
      systemInstruction: "Analiza datos de fitness y ofrece un 'Tip de Comportamiento' de máximo 2 frases basado en psicología del hábito."
    }
  });
  return response.text || "Sigue constante, cada repetición cuenta.";
};
