import {
  AuditFormData,
  AuditResult,
  ToolAuditResult,
  ToolEntry
} from "./types";
import { nanoid } from "nanoid";
import auditCursor from "./audit/cursor";

import auditCopilot from "./audit/copilot";
import auditClaude from "./audit/claude";
import auditChatGPT from "./audit/chatgpt";
import auditGemini from "./audit/gemini";
import auditWindsurf from "./audit/windsurf";
import auditOpenAIAPI from "./audit/openaiAPI";
import auditAnthropicAPI from "./audit/antropicAPI";

function auditTool(entry: ToolEntry, formData: AuditFormData): ToolAuditResult {
  switch (entry.tool) {
    case "cursor":
      return auditCursor(entry, formData);
    case "github-copilot":
      return auditCopilot(entry, formData);
    case "claude":
      return auditClaude(entry, formData);
    case "chatgpt":
      return auditChatGPT(entry, formData);
    case "gemini":
      return auditGemini(entry, formData);

    case "windsurf":
      return auditWindsurf(entry, formData);
    case "openai-api":
      return auditOpenAIAPI(entry, formData);
    case "anthropic-api":
      return auditAnthropicAPI(entry, formData);
  }
}

export function runAudit(formData: AuditFormData): AuditResult {
  const toolResults = formData.tools.map((entry) => auditTool(entry, formData));
  const totalMonthlySavings = toolResults.reduce(
    (sum, r) => sum + r.estimatedMonthlySavings,
    0
  );

  return {
    id: nanoid(),
    toolResults,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    useCase: formData.useCase,
    teamSize: formData.teamSize,
    createdAt: new Date().toISOString()
  };
}

