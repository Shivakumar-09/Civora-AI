import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { datasetSummary, correlations, predictions } = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your-gemini-api-key-here") {
      return NextResponse.json({
        summary: "API Key missing. Local fallback active.",
        explanations: ["Trend upward due to historical factors.", "High engagement detected."],
        forecast: "Stable increase expected."
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a Senior Data Analytics AI specializing in election trends.
    
    Given this data summary:
    Summary: ${JSON.stringify(datasetSummary)}
    Correlations: ${JSON.stringify(correlations)}
    Predictions: ${JSON.stringify(predictions)}
    
    Respond in STRICT JSON with this exact schema:
    {
      "summary": "<1 paragraph overall analysis>",
      "explanations": ["<Insight 1>", "<Insight 2>", "<Insight 3>"],
      "forecast": "<1-2 sentences on what to expect based on predictions>"
    }
    
    Make it sound highly analytical, futuristic, and professional.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return NextResponse.json(JSON.parse(jsonMatch[0]));
    }
    throw new Error("Invalid AI response format");
  } catch (error: any) {
    console.error("Prediction AI Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate AI insights" }, { status: 500 });
  }
}
