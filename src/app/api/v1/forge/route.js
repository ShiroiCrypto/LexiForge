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
        VOCÊ É UM ORÁCULO LITERÁRIO. SUA MISSÃO É FORJAR UMA SAGA ÉPICA BASEADA EM UMA ÚNICA PALAVRA.
        
        A PALAVRA É: "${word}"
        
        REGRAS:
        1. O Título deve ser misterioso e imponente.
        2. A História deve ter no máximo 4 parágrafos curtos.
        3. O tom deve ser solene, antigo e levemente sombrio (Tech-Noir / Cyber-Fantasy).
        4. A Frase de Ouro deve ser uma citação filosófica impactante.
        
        RETORNE APENAS JSON VÁLIDO NO SEGUINTE FORMATO:
        {
            "titulo": "...",
            "historia": "...",
            "frase_de_ouro": "..."
        }
        `;

        // Check if AI client is initialized
        if (!ai) {
            return NextResponse.json(
                { error: "AI Client not initialized. Check GROQ_API_KEY." },
                { status: 500 }
            );
        }

        const completion = await ai.chat.completions.create({
            model: modelId, // "google/gemini-1.5-flash" via gateway
            messages: [
                { role: "system", content: "You represent a literary oracle. Output strictly valid JSON." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7
        });

        const responseContent = completion.choices[0].message.content;

        //apenas sim.
        let result;
        try {
            result = JSON.parse(responseContent);
        } catch (e) {
            // Fallback if JSON is wrapped in markdown code fence
            const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                result = JSON.parse(jsonMatch[0]);
            } else {
                console.error("Invalid JSON from AI:", responseContent);
                throw new Error("Invalid JSON format from AI");
            }
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error("Forge Error:", error);
        return NextResponse.json(
            { error: "Falha na forja: " + error.message },
            { status: 500 }
        );
    }
}
