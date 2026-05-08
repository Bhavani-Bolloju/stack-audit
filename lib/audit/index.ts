import {
  AuditFormData,
  AuditResult,
  ToolAuditResult,
  ToolEntry,
  ToolName
} from "./types";

import { nanoid } from "nanoid";

export function runAudit(formData: AuditFormData): AuditResult {
  const toolResults = formData.tools.map((entry : ToolEntry) => auditTool(entry, formData));

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

function auditTool(entry: ToolEntry, formData: AuditFormData): ToolAuditResult {
  switch (entry.tool) {
    case "cursor":
      return auditCursor(entry, formData);
    // case "github-copilot":
    //   return auditCopilot(entry, formData);
    // case "claude":
    //   return auditClaude(entry, formData);
    // case "chatgpt":
    //   return auditChatGPT(entry, formData);
    // case "anthropic-api":
    //   return auditAnthropicAPI(entry, formData);
    // case "openai-api":
    //   return auditOpenAIAPI(entry, formData);
    // case "gemini":
    //   return auditGemini(entry, formData);
    // case "windsurf":
    //   return auditWindsurf(entry, formData);
  }
}
