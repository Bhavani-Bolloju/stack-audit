import { GoogleGenAI } from "@google/genai";
import { AuditResult } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });



export async function generateSummary(result: AuditResult): Promise<string> {
  const toolSummary = result.toolResults
    .map(
      (t) =>
        `${t.toolName} (${t.plan}): ${t.recommendedAction} — saves $${t.estimatedMonthlySavings}/mo`
    )
    .join("\n");

  // console.log(toolSummary, "tool summary");

  const prompt = `You are an AI spend analyst. Write a 100-word personalized audit summary for a startup based on this data:

  Team size: ${result.teamSize}
  Primary use case: ${result.useCase}
  Total monthly savings identified: $${result.totalMonthlySavings}
  Annual savings: $${result.totalAnnualSavings}

  Tool recommendations:
  ${toolSummary}

  Write in second person ("You", "Your team"). Be specific, honest, and actionable. If savings are low, acknowledge they're spending well. Do not use bullet points. Plain paragraph only.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    // console.log("Gemini response", JSON.stringify(response, null, 2));
    return response.text ?? fallbackSummary(result);
  } catch {
    // console.log("fallback catch");
    // console.log(error, "error");
    return fallbackSummary(result);
  }
}

function fallbackSummary(result: AuditResult): string {
  if (result.totalMonthlySavings === 0) {
    return `Your AI stack looks well-optimized for a team of ${result.teamSize}. You're on the right plans for your ${result.useCase} use case with no significant overspend detected. Keep monitoring as your team grows or your usage patterns change.`;
  }
  return `Based on your current AI tool spend, your team of ${result.teamSize} could save $${result.totalMonthlySavings} per month — $${result.totalAnnualSavings} annually. The biggest opportunities are in right-sizing your plans and eliminating unused seats. Acting on these recommendations could meaningfully reduce your AI infrastructure costs.`;
}

