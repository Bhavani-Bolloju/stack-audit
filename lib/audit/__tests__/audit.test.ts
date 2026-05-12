import { AuditFormData } from "@/lib/types";
import { runAudit } from "../../index";

const baseForm: AuditFormData = {
  tools: [],
  teamSize: 2,
  useCase: "coding"
};

test("cursor overprovisioned seats returns downgrade", () => {
  const result = runAudit({
    ...baseForm,
    tools: [
      { id: "1", tool: "cursor", plan: "Pro", monthlySpend: 60, seats: 3 }
    ],
    teamSize: 1
  });
  expect(result.toolResults[0].recommendation).toBe("downgrade");
  expect(result.toolResults[0].estimatedMonthlySavings).toBe(40);
});

test("cursor optimal returns no savings", () => {
  const result = runAudit({
    ...baseForm,
    tools: [
      { id: "1", tool: "cursor", plan: "Pro", monthlySpend: 20, seats: 1 }
    ],
    teamSize: 1
  });
  expect(result.toolResults[0].recommendation).toBe("optimal");
  expect(result.toolResults[0].estimatedMonthlySavings).toBe(0);
});

test("cursor wrong use case returns switch", () => {
  const result = runAudit({
    ...baseForm,
    tools: [
      { id: "1", tool: "cursor", plan: "Pro", monthlySpend: 20, seats: 1 }
    ],
    teamSize: 1,
    useCase: "writing"
  });
  expect(result.toolResults[0].recommendation).toBe("switch");
});

test("high spend returns credits recommendation", () => {
  const result = runAudit({
    ...baseForm,
    tools: [
      { id: "1", tool: "cursor", plan: "Pro", monthlySpend: 300, seats: 15 }
    ],
    teamSize: 15
  });
  expect(result.toolResults[0].recommendation).toBe("credits");
});

test("total savings is sum of all tool savings", () => {
  const result = runAudit({
    ...baseForm,
    tools: [
      { id: "1", tool: "cursor", plan: "Pro", monthlySpend: 60, seats: 3 },
      { id: "2", tool: "claude", plan: "Pro", monthlySpend: 60, seats: 3 }
    ],
    teamSize: 1
  });
  expect(result.totalMonthlySavings).toBe(
    result.toolResults.reduce((sum, t) => sum + t.estimatedMonthlySavings, 0)
  );
});

