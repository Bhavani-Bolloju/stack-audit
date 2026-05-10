"use client";

import { useEffect, useState } from "react";
import { AuditFormData, ToolEntry, ToolName, UseCase } from "@/lib/types";
import { loadFormData, saveFormData } from "@/lib/storage";
import ToolEntryRow from "./ToolEntry";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

const USE_CASES: { value: UseCase; label: string }[] = [
  { value: "coding", label: "Coding / Engineering" },
  { value: "writing", label: "Writing / Content" },
  { value: "data", label: "Data / Analytics" },
  { value: "research", label: "Research" },
  { value: "mixed", label: "Mixed / General" }
];

import { runAudit } from "@/lib";

function ToolForm() {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const [form, setForm] = useState<AuditFormData>(() => ({
    tools: [
      {
        id: nanoid(8),
        tool: "cursor" as ToolName,
        plan: "",
        monthlySpend: 0,
        seats: 1
      }
    ],
    teamSize: 1,
    useCase: "coding"
  }));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const saved = loadFormData();
    if (saved) setForm(saved);
  }, []);

  useEffect(() => {
    saveFormData(form);
  }, [form]);

  if (!mounted) return null;
  function addTool() {
    setForm((prev) => ({
      ...prev,
      tools: [
        ...prev.tools,
        {
          id: nanoid(8),
          tool: "cursor" as ToolName,
          plan: "",
          monthlySpend: 0,
          seats: 1
        }
      ]
    }));
  }

  function updateTool(updated: ToolEntry) {
    setForm((prev) => ({
      ...prev,
      tools: prev.tools.map((t) => (t.id === updated.id ? updated : t))
    }));
  }

  function removeTool(id: string) {
    setForm((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t.id !== id)
    }));
  }

  function handleSubmit() {
    const results = runAudit(form);
    console.log(results, "results");
    localStorage.setItem("auditResult", JSON.stringify(results));
    router.push(`/audit/${results.id}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">StackAudit</h1>
      <p className="text-gray-500 mb-6">
        Find out where you&apos;re overspending on AI tools.
      </p>

      <div className="space-y-3 mb-4">
        {form.tools.map((entry) => (
          <ToolEntryRow
            key={entry.id}
            entry={entry}
            onChange={updateTool}
            onRemove={removeTool}
          />
        ))}
      </div>

      <button
        onClick={addTool}
        className="text-sm text-blue-600 hover:underline mb-6"
      >
        + Add another tool
      </button>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Team size</label>
          <input
            type="number"
            min={1}
            value={form.teamSize}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, teamSize: Number(e.target.value) }))
            }
            className="border rounded px-2 py-1 w-24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Primary use case
          </label>
          <select
            value={form.useCase}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                useCase: e.target.value as UseCase
              }))
            }
            className="border rounded px-2 py-1"
          >
            {USE_CASES.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Run Audit →
      </button>
    </div>
  );
}

export default ToolForm;

