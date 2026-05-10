"use client";

import { useEffect, useState } from "react";
import { AuditResult } from "../../../lib/types";

export default function AuditPage() {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const stored = localStorage.getItem("auditResult");
    if (stored) setResult(JSON.parse(stored));
  }, []);

  if (!mounted) return null;
  if (!result) return <div className="p-8">No audit found.</div>;

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Your AI Spend Audit</h1>

      {/* Hero savings */}
      <div className="bg-black text-white rounded-2xl p-8 mb-8 text-center">
        <p className="text-lg mb-2">You could save</p>
        <p className="text-6xl font-bold">${result.totalMonthlySavings}/mo</p>
        <p className="text-gray-400 mt-2">
          ${result.totalAnnualSavings} per year
        </p>
      </div>

      {/* Per tool breakdown */}
      <div className="space-y-4">
        {result.toolResults.map((tool, i) => (
          <div key={i} className="border rounded-xl p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-semibold text-lg capitalize">
                {tool.toolName}
              </h2>
              <span className="text-green-600 font-bold">
                {tool.estimatedMonthlySavings > 0 ?
                  `Save $${tool.estimatedMonthlySavings}/mo`
                : "✓ Optimal"}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-3">{tool.reason}</p>
            <div className="bg-gray-50 rounded-lg p-3 text-sm">
              <span className="font-medium">Recommended: </span>
              {tool.recommendedAction}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

