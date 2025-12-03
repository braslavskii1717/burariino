import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { BURATINO_SYSTEM_INSTRUCTION } from "../constants";

// Ideally, this is initialized with a key from env, but for the demo we assume it's available
// In a real backend implementation (as shown in the docs tab), this would be server-side.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const streamGeminiResponse = async function* (
  modelName: string,
  userMessage: string,
  history: { role: string; parts: { text: string }[] }[]
) {
  try {
    const chat = ai.chats.create({
      model: modelName,
      config: {
        systemInstruction: BURATINO_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history,
    });

    const result = await chat.sendMessageStream({ message: userMessage });

    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        yield c.text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "Произошла ошибка связи с сервером. Пожалуйста, попробуйте позже. (Check API Key)";
  }
};