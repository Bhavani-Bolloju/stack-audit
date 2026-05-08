export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

export type ToolName =
  | "cursor"
  | "github-copilot"
  | "claude"
  | "chatgpt"
  | "anthropic-api"
  | "openai-api"
  | "gemini"
  | "windsurf";

export type ToolEntry = {
  id: string;
  tool: ToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
};

export type AuditFormData = {
  tools: ToolEntry[];
  teamSize: number;
  useCase: UseCase;
};

//Audit Results types

export type Recommendation =
  | "downgrade"
  | "upgrade"
  | "switch"
  | "optimize"
  | "credits"
  | "optimal";

export type ToolAuditResult = {
  toolName: ToolName;
  plan: string;
  currentMonthlySpending: number;
  recommendation: Recommendation;
  recommendedAction: string;
  estimatedMonthlySaving: number;
  reason: string;
};

export type AuditResult = {
  id: string;
  toolResults: ToolAuditResult[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  useCase: UseCase;
  teamSize: number;
  createdAt: string;
};

