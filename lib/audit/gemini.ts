import { ToolEntry, ToolAuditResult, AuditFormData } from "../types";

import {
  TOOL_PRICES,
  getAlternativeTools,
  CREDITS_THRESHOLD,
  getLowerTier
} from "../constants";

const PRICES = TOOL_PRICES["gemini"];

import auditGeminiAPI from "./geminiAPI";

function auditGemini(
  entry: ToolEntry,
  formData: AuditFormData
): ToolAuditResult {
  const { monthlySpend, seats, plan, tool } = entry;
  const { teamSize, useCase } = formData;
  const pricePerSeat = PRICES[plan] ?? 0;

  if (plan === "API direct") {
    return auditGeminiAPI(entry, formData);
  }

  //1. over-provisioned
  if (seats > teamSize) {
    const savings = (seats - teamSize) * pricePerSeat;
    return {
      toolName: tool,
      plan,
      currentMonthlySpending: monthlySpend,
      estimatedMonthlySavings: savings,
      recommendation: "downgrade",
      recommendedAction: `Remove ${seats - teamSize} unused seat(s)`,
      reason: `You have ${seats} seats for a team of ${teamSize} — ${seats - teamSize} seat(s) are unused.`
    };
  }

  //2. cheaper plan same vendor
  if (plan === "Ultra" && teamSize <= 3) {
    const lowerTier = getLowerTier("gemini", plan);
    const savings = seats * (pricePerSeat - PRICES[lowerTier]);
    return {
      toolName: tool,
      plan,
      currentMonthlySpending: monthlySpend,
      recommendation: "downgrade",
      recommendedAction: `Downgrade to Gemini ${lowerTier}`,
      estimatedMonthlySavings: savings,
      reason: `Gemini is overkill for a team of ${teamSize} — ${lowerTier} covers standard usage at $${PRICES[lowerTier]}/seat.`
    };
  }

  //3. wrong tool for use case
  if (useCase === "coding" || useCase === "data") {
    const alternatives = getAlternativeTools("gemini", useCase);
    const lowestAlternativePrice = Math.min(
      ...alternatives.map((tool) =>
        Math.min(...Object.values(TOOL_PRICES[tool]).filter((p) => p > 0))
      )
    );

    const savings = Math.max(0, monthlySpend - lowestAlternativePrice * seats);

    return {
      toolName: tool,
      plan,
      currentMonthlySpending: monthlySpend,
      recommendation: "switch",
      recommendedAction: `Switch to ${alternatives.join("/")}`,
      estimatedMonthlySavings: savings,
      reason: `Gemini is optimized for writing and research`
    };
  }

  // 4. Credits opportunity
  if (monthlySpend > CREDITS_THRESHOLD) {
    return {
      toolName: tool,
      plan,
      currentMonthlySpending: monthlySpend,
      recommendation: "credits",
      recommendedAction: "Get Gemini through Credex discounted credits",
      estimatedMonthlySavings: Math.round(monthlySpend * 0.2),
      reason: `At $${monthlySpend}/month you could save ~20% through discounted credits via Credex.`
    };
  }

  // 5. Optimal
  return {
    toolName: tool,
    plan,
    currentMonthlySpending: monthlySpend,
    recommendation: "optimal",
    recommendedAction: "No changes needed",
    estimatedMonthlySavings: 0,
    reason: "Your Gemini setup looks right-sized for your team and use case."
  };
}

export default auditGemini;

