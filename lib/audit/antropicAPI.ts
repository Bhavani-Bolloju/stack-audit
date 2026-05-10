import { getAlternativeTools, CREDITS_THRESHOLD } from "../constants";
import { ToolEntry, AuditFormData, ToolAuditResult } from "../types";

function auditAnthropicAPI(
  entry: ToolEntry,
  formData: AuditFormData
): ToolAuditResult {
  const { monthlySpend, plan, tool } = entry;
  const { useCase } = formData;

  //1. wrong tool for use case
  if (useCase !== "coding") {
    const alternatives = getAlternativeTools("windsurf", useCase);

    return {
      toolName: tool,
      plan,
      currentMonthlySpending: monthlySpend,
      recommendation: "switch",
      recommendedAction: `Switch to ${alternatives.join(" or ")}`,
      estimatedMonthlySavings: 0,
      reason: `Anthropic API is built for coding — your use case (${useCase}) is better served by ${alternatives.join("/")}.`
    };
  }

  // 2. Credits opportunity
  if (monthlySpend > CREDITS_THRESHOLD) {
    return {
      toolName: tool,
      plan,
      currentMonthlySpending: monthlySpend,
      recommendation: "credits",
      recommendedAction: "Get Anthropic API through Credex discounted credits",
      estimatedMonthlySavings: Math.round(monthlySpend * 0.2),
      reason: `At $${monthlySpend}/month you could save ~20% through discounted credits via Credex.`
    };
  }

  // 3. Optimal
  return {
    toolName: tool,
    plan,
    currentMonthlySpending: monthlySpend,
    recommendation: "optimal",
    recommendedAction: "No changes needed",
    estimatedMonthlySavings: 0,
    reason:
      "Your Anthropic API setup looks right-sized for your team and use case."
  };
}

export default auditAnthropicAPI;

