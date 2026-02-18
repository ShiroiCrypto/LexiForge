import { ai, modelId } from "@/lib/gemini";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req) {
    try {
        const { word } = await req.json();

        if (!word || typeof word !== "string" || word.trim().length === 0) {
            return NextResponse.json(
                { error: "A valid word is required." },
                { status: 400 }
            );
        }

        const prompt = `
      Você é o LexiForge, um antigo mestre da retórica e do storytelling épico. 
      Sua única tarefa é receber uma palavra e forjar uma narrativa curta, porém poderosa (uma saga). 
      O tom deve ser solene, místico e inspirador. 
      
      A palavra escolhida é: "${word}".

      Sua saída DEVE ser um JSON estruturado com as chaves: 
      { 
        "titulo": "...", 
        "historia": "...", 
        "frase_de_ouro": "..." 
      }. 
      
      Use metáforas e vocabulário elevado.
    `;

        // Using the new SDK (preview style)
        const result = await ai.models.generateContent({
            model: modelId,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 65536,
            }
        });

        // The new SDK handling might vary, assuming result.text is the content or result.response.text()
        // Based on user snippet: console.log(response.text);
        // Let's assume result IS the response object wrapper or has .text

        // Inspecting the SDK typings would be ideal, but based on the snippet `const response = await ai.models.generateContent(...)`, `response.text` gives the text.

        const text = result.text;

        // Parse JSON safely
        let jsonResponse;
        try {
            const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
            jsonResponse = JSON.parse(cleanedText);
        } catch (e) {
            console.error("Failed to parse JSON response:", text);
            return NextResponse.json(
                { error: "Failed to generate a valid response." },
                { status: 500 }
            );
        }

        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}
