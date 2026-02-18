import OpenAI from 'openai';

const apiKey = process.env.GROQ_API_KEY;

let ai;

try {
    if (apiKey) {
        ai = new OpenAI({
            apiKey: apiKey,
            baseURL: 'https://api.groq.com/openai/v1',
        });
    } else {
        console.warn("GROQ_API_KEY is not defined. AI features will not work.");
    }
} catch (error) {
    console.error("Failed to initialize Groq client", error);
}

export { ai };
// Using Llama 3.3 70B for excellent reasoning and speed
export const modelId = "llama-3.3-70b-versatile"; 
