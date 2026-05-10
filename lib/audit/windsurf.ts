import {
  getAlternativeTools,
  TOOL_PRICES,
  CREDITS_THRESHOLD,
  SMALL_TEAM,
  getLowerTier
} from "../constants";
import { ToolEntry, AuditFormData, ToolAuditResult } from "../types";

const PRICES = TOOL_PRICES["windsurf"];
function auditWindsurf(
  entry: ToolEntry,
  formData: AuditFormData
): ToolAuditResult {
  const { monthlySpend, seats, plan, tool } = entry;
  const { teamSize, useCase } = formData;
  const pricePerSeat = PRICES[plan] ?? 0;

  //1. over-provisioned
  if (seats > teamSize) {
    const savings = (seats - teamSize) * pricePerSeat;

    console.log(savings, "savings");
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
  if (
    (plan === "Enterprise" || plan === "Max" || plan === "Team") &&
    teamSize <= SMALL_TEAM
  ) {
    const lowerTier = getLowerTier("windsurf", plan);
    const savings = seats * (pricePerSeat - PRICES[lowerTier]);
    return {
      toolName: tool,
      plan,
      currentMonthlySpending: monthlySpend,
      recommendation: "downgrade",
      recommendedAction: `Downgrade to Windsurf ${lowerTier}`,
      estimatedMonthlySavings: savings,
      reason: `Windsurf is overkill for a team of ${teamSize} — ${lowerTier} covers standard usage at $${PRICES[lowerTier]}/seat.`
    };
  }

  //3. wrong tool for use case
  if (useCase !== "coding") {
    const alternatives = getAlternativeTools("windsurf", useCase);
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
      recommendedAction: `Switch to ${alternatives.join(" or ")}`,
      estimatedMonthlySavings: savings,
      reason: `Windsurf is built for coding — your use case (${useCase}) is better served by ${alternatives.join("/")}.`
    };
  }

  // 4. Credits opportunity
  if (monthlySpend > CREDITS_THRESHOLD) {
    return {
      toolName: tool,
      plan,
      currentMonthlySpending: monthlySpend,
      recommendation: "credits",
      recommendedAction: "Get Windsurf through Credex discounted credits",
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
    reason: "Your Windsurf setup looks right-sized for your team and use case."
  };
}

export default auditWindsurf;

