import { ToolName, UseCase } from "./types";

export const TOOL_TIERS: Record<ToolName, string[]> = {
  cursor: ["Hobby", "Pro", "Pro+", "ultra", "Teams", "Enterprise"],
  "github-copilot": ["Free", "Pro", "Pro+", "Business", "Enterprise"],
  claude: ["Free", "Pro", "Max", "Team", "Enterprise"],
  chatgpt: [
    "Free",
    "Go",
    "Plus",
    "Pro",
    "Business ChatGPT & Codex",
    "Business Codex",
    "Enterprise"
  ],
  "anthropic-api": ["API direct"],
  "openai-api": ["API"],
  gemini: ["plus", "Pro", "Ultra", "API"],
  windsurf: ["Free", "Pro", "Max", "Team", "Enterprise"]
};

export const TOOL_PRICES: Record<ToolName, Record<string, number>> = {
  cursor: {
    Hobby: 0,
    Pro: 20,
    "Pro+": 40,
    Ultra: 100,
    Teams: 40,
    Enterprise: 60
  },
  "github-copilot": {
    Free: 0,
    Pro: 10,
    "Pro+": 19,
    Business: 19,
    Enterprise: 39
  },
  claude: { Free: 0, Pro: 20, Max: 100, Team: 30, Enterprise: 60 },
  chatgpt: {
    Free: 0,
    Go: 14,
    Plus: 20,
    Pro: 200,
    "Business ChatGPT & Codex": 30,
    "Business Codex": 30,
    Enterprise: 60
  },
  "anthropic-api": { "API direct": 0 },
  "openai-api": { "API direct": 0 },
  gemini: { Plus: 19, Pro: 20, Ultra: 249 },
  windsurf: { Free: 0, Pro: 15, Max: 90, Team: 30, Enterprise: 60 }
};

export const TOOL_USE_CASES: Record<ToolName, string[]> = {
  cursor: ["coding"],
  "github-copilot": ["coding"],
  claude: ["writing", "research", "data", "mixed"],
  chatgpt: ["writing", "research", "data", "mixed"],
  "anthropic-api": ["coding", "data"],
  "openai-api": ["coding", "data"],
  gemini: ["writing", "research", "mixed"],
  windsurf: ["coding"]
};

export function getAlternativeTools(
  currentTool: ToolName,
  useCase: UseCase
): ToolName[] {
  return (Object.entries(TOOL_USE_CASES) as [ToolName, UseCase[]][])
    .filter(([tool, cases]) => tool !== currentTool && cases.includes(useCase))
    .map(([tool]) => tool);
}

export function getLowerTier(
  tool: ToolName,
  currentPlan: string
): string  {
  const tiers = TOOL_TIERS[tool];
  const currentIndex = tiers.indexOf(currentPlan);
  if (currentIndex <= 0) return tiers[currentIndex];
  return tiers[currentIndex - 1];
}

export const CREDITS_THRESHOLD = 200;
export const SMALL_TEAM = 3;
export const MEDIUM_TEAM = 10;

