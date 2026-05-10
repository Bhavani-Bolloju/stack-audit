"use client";

import { useState, useEffect } from "react";
import { AuditResult, ToolAuditResult } from "../../../lib/types";
import Link from "next/link";

const RECOMMENDATION_COLORS: Record<string, string> = {
  downgrade: "bg-amber-50 border-amber-200 text-amber-700",
  switch: "bg-blue-50 border-blue-200 text-blue-700",
  credits: "bg-emerald-50 border-emerald-200 text-emerald-700",
  optimal: "bg-gray-50 border-gray-200 text-gray-500"
};

const RECOMMENDATION_LABELS: Record<string, string> = {
  downgrade: "↓ Downgrade",
  switch: "⇄ Switch",
  credits: "✦ Get Credits",
  optimal: "✓ Optimal"
};

const TOOL_DISPLAY_NAMES: Record<string, string> = {
  cursor: "Cursor",
  "github-copilot": "GitHub Copilot",
  claude: "Claude",
  chatgpt: "ChatGPT",
  "anthropic-api": "Anthropic API",
  "openai-api": "OpenAI API",
  gemini: "Gemini",
  windsurf: "Windsurf"
};

function ToolCard({ tool }: { tool: ToolAuditResult }) {
  const colorClass =
    RECOMMENDATION_COLORS[tool.recommendation] ?? RECOMMENDATION_COLORS.optimal;
  const label = RECOMMENDATION_LABELS[tool.recommendation] ?? "✓ Optimal";

  return (
    <div className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {TOOL_DISPLAY_NAMES[tool.toolName] ?? tool.toolName}
          </h3>
          <p className="text-sm text-gray-400">
            {tool.plan} · ${tool.currentMonthlySpending}/mo
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border ${colorClass}`}
        >
          {label}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{tool.reason}</p>

      <div className="flex justify-between items-center">
        <div className="bg-gray-50 rounded-xl px-4 py-2 text-sm text-gray-700">
          {tool.recommendedAction}
        </div>
        {tool.estimatedMonthlySavings > 0 && (
          <span className="text-emerald-600 font-bold text-sm">
            −${tool.estimatedMonthlySavings}/mo
          </span>
        )}
      </div>
    </div>
  );
}

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
  if (!result)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        No audit found.
      </div>
    );

  const hasHighSavings = result.totalMonthlySavings > 500;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center w-full">
        <h1 className="text-xl font-bold tracking-tight">StackAudit</h1>

        <div className="">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            ← Back to audit
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Hero savings block */}
        <div className="bg-black text-white rounded-3xl p-10 mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-black opacity-80" />
          <div className="relative z-10">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">
              Potential monthly savings
            </p>
            <p className="text-7xl font-black tracking-tight mb-1">
              ${result.totalMonthlySavings}
            </p>
            <p className="text-gray-400 text-sm">
              ${result.totalAnnualSavings.toLocaleString()} per year
            </p>
          </div>
        </div>

        {/* Credex CTA for high savings */}
        {hasHighSavings && (
          <div className="bg-emerald-950 text-white rounded-2xl p-6 mb-8 flex justify-between items-center">
            <div>
              <p className="font-semibold text-emerald-300 mb-1">
                You qualify for Credex credits
              </p>
              <p className="text-sm text-emerald-400">
                Get discounted AI credits and capture even more of these
                savings.
              </p>
            </div>
            <a
              href="https://credex.rocks"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-400 text-black font-semibold text-sm px-4 py-2 rounded-xl hover:bg-emerald-300 transition-colors whitespace-nowrap ml-4"
            >
              Book a call →
            </a>
          </div>
        )}

        {/* Tool breakdown */}
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Tool Breakdown
        </h2>
        <div className="space-y-4 mb-10">
          {result.toolResults.map((tool, i) => (
            <ToolCard key={i} tool={tool} />
          ))}
        </div>

        {/* Low savings honest message */}
        {result.totalMonthlySavings < 100 && (
          <div className="border border-gray-200 rounded-2xl p-6 text-center text-gray-500 text-sm">
            <p className="font-semibold text-gray-700 mb-1">
              You&apos;re spending well 👍
            </p>
            <p>
              Your AI stack looks well-optimized. We&apos;ll notify you when new
              savings apply.
            </p>
          </div>
        )}

        {/* Share + capture */}
        <div className="mt-8 border border-gray-200 rounded-2xl p-6 text-center">
          <p className="font-semibold text-gray-800 mb-1">
            Save or share your audit
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Enter your email to get a copy of this report.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
              Send report
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

