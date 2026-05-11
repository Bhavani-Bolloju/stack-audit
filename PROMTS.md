## Audit Summary Prompt

**Model:** gemini-2.5-flash  
**Location:** lib/summary.ts

**Prompt:**
You are an AI spend analyst. Write a 100-word personalized audit summary for a startup based on this data:

Team size: {teamSize}
Primary use case: {useCase}
Total monthly savings identified: ${totalMonthlySavings}
Annual savings: ${totalAnnualSavings}

Tool recommendations:
{toolSummary}

Write in second person ("You", "Your team"). Be specific, honest, and actionable. If savings are low, acknowledge they're spending well. Do not use bullet points. Plain paragraph only.

**Why this way:**
- Second person makes it feel personal not generic
- Explicit instruction for no bullet points — LLMs default to lists
- Fallback handles API failures gracefully

**What didn't work:**
- gemini-2.0-flash hit quota limits on free tier — switched to gemini-2.5-flash
