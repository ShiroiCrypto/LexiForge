import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}

export const ai = new GoogleGenAI({ apiKey });

export const modelId = "gemini-3-flash-preview";
