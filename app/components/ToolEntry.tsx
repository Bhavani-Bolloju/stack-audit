"use client";

import { ToolEntry, ToolName } from "@/lib/types";

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

const PLANS: Record<ToolName, string[]> = {
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

type Props = {
  entry: ToolEntry;
  onChange: (updated: ToolEntry) => void;
  onRemove: (id: string) => void;
};

function ToolEntryRow({ entry, onChange, onRemove }: Props) {
  return (
    <div className="flex gap-3 items-center p-3 border rounded-lg">
      <select
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
        value={entry.plan}
        onChange={(e) => onChange({ ...entry, plan: e.target.value })}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="">Select plan</option>
        {PLANS[entry.tool].map((p) => (
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
      />

      <input
        type="number"
        placeholder="Seats"
        value={entry.seats || ""}
        onChange={(e) => onChange({ ...entry, seats: Number(e.target.value) })}
        className="border rounded px-2 py-1 text-sm w-20"
      />

      <button
        onClick={() => onRemove(entry.id)}
        className="text-red-500 text-sm hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
}

export default ToolEntryRow;

