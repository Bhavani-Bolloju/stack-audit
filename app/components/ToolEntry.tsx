"use client";

import { ToolEntry, ToolName } from "@/lib/types";
import { TOOL_TIERS } from "@/lib/constants";

const TOOLS: { value: ToolName; label: string }[] = [
  { value: "cursor", label: "Cursor" },
  { value: "github-copilot", label: "GitHub Copilot" },
  { value: "claude", label: "Claude" },
  { value: "chatgpt", label: "ChatGPT" },
  { value: "anthropic-api", label: "Anthropic API" },
  { value: "openai-api", label: "OpenAI API" },
  { value: "gemini", label: "Gemini" },
  { value: "windsurf", label: "Windsurf" }
];

type Props = {
  entry: ToolEntry;
  onChange: (updated: ToolEntry) => void;
  onRemove: (id: string) => void;
};

function ToolEntryRow({ entry, onChange, onRemove }: Props) {
  return (
    <div className="flex gap-3 items-center p-3 border rounded-lg">
      <select
        aria-label="Select AI tool"
        value={entry.tool}
        onChange={(e) =>
          onChange({ ...entry, tool: e.target.value as ToolName, plan: "" })
        }
        className="border rounded px-2 py-1 text-sm"
      >
        {TOOLS.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <select
        aria-label="Select AI plan"
        value={entry.plan}
        onChange={(e) => onChange({ ...entry, plan: e.target.value })}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="">Select plan</option>
        {TOOL_TIERS[entry.tool].map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="$/month"
        value={entry.monthlySpend || ""}
        onChange={(e) =>
          onChange({ ...entry, monthlySpend: Number(e.target.value) })
        }
        className="border rounded px-2 py-1 text-sm w-24"
        aria-label="Monthly spend in dollars"
      />

      <input
        type="number"
        placeholder="Seats"
        aria-label="Number of seats"
        value={entry.seats || ""}
        onChange={(e) => onChange({ ...entry, seats: Number(e.target.value) })}
        className="border rounded px-2 py-1 text-sm w-20"
      />

      <button
        onClick={() => onRemove(entry.id)}
        className="text-red-700 text-sm font-semibold hover:text-red-600 hover:cursor-pointer"
      >
        Remove
      </button>
    </div>
  );
}

export default ToolEntryRow;

