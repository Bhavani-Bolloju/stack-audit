import { ToolEntry, ToolAuditResult, AuditFormData } from "../types";

import {
  TOOL_PRICES,
  getAlternativeTools,
  CREDITS_THRESHOLD,
  getLowerTier
} from "../constants";

const PRICES = TOOL_PRICES["cursor"];

function auditCursor(
  entry: ToolEntry,
  formData: AuditFormData
): ToolAuditResult {
  const { monthlySpend, seats, plan } = entry;
  const { teamSize, useCase } = formData;
  const pricePerSeat = PRICES[plan] ?? 0;

  //1. over-provisioned
  if (seats > teamSize) {
    const savings = (seats - teamSize) * pricePerSeat;
    return {
      toolName: "cursor",
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
    (plan === "Ultra" ||
      plan === "Pro+" ||
      plan === "Teams" ||
      plan === "Enterprise") &&
    teamSize <= 3
  ) {
    const lowerTier = getLowerTier("cursor", plan);
    const savings = seats * (pricePerSeat - PRICES[lowerTier]);
    return {
      toolName: "cursor",
      plan,
      currentMonthlySpending: monthlySpend,
      recommendation: "downgrade",
      recommendedAction: `Downgrade to Cursor ${lowerTier}`,
      estimatedMonthlySavings: savings,
      reason: `${plan} is overkill for a team of ${teamSize} — ${lowerTier} covers standard usage at $${PRICES[lowerTier]}/seat.`
    };
  }

  //3. wrong tool for use case
  if (useCase !== "coding" && useCase !== "mixed") {
    const alternatives = getAlternativeTools("cursor", useCase);
    const lowestAlternativePrice = Math.min(
      ...alternatives.map((tool) =>
        Math.min(...Object.values(TOOL_PRICES[tool]).filter((p) => p > 0))
      )
    );

    const savings = Math.max(0, monthlySpend - lowestAlternativePrice * seats);

    return {
      toolName: "cursor",
      plan,
      currentMonthlySpending: monthlySpend,
      recommendation: "switch",
      recommendedAction: `Switch to ${alternatives.join("/")}`,
      estimatedMonthlySavings: savings,
      reason: `Cursor is built for coding — your use case (${useCase}) is better served by ${alternatives.join("/")}.`
    };
  }

  // 4. Credits opportunity
  if (monthlySpend > CREDITS_THRESHOLD) {
    return {
      toolName: "cursor",
      plan,
      currentMonthlySpending: monthlySpend,
      recommendation: "credits",
      recommendedAction: "Get Cursor through Credex discounted credits",
      estimatedMonthlySavings: Math.round(monthlySpend * 0.2),
      reason: `At $${monthlySpend}/month you could save ~20% through discounted credits via Credex.`
    };
  }

  // 5. Optimal
  return {
    toolName: "cursor",
    plan,
    currentMonthlySpending: monthlySpend,
    recommendation: "optimal",
    recommendedAction: "No changes needed",
    estimatedMonthlySavings: 0,
    reason: "Your Cursor setup looks right-sized for your team and use case."
  };
}

export default auditCursor;

/*



*/

