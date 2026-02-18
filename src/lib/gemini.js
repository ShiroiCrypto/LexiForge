import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

// Lazy initialization to allow build without API key
let ai;
try {
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    } else {
        console.warn("GEMINI_API_KEY is not defined. AI features will not work.");
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI", error);
}

export { ai };
export const modelId = "gemini-3-flash-preview";
