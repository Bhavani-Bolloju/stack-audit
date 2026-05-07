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
