## Day 1 — 2026-05-06

**Hours worked:** 1.2

**What I did:** Read assignment in full, set up Next.js repo with TypeScript and Tailwind, decided on app name (StackAudit)

**What I learned:** This is 50% product thinking not just code. User interviews are non-negotiable and need to start tomorrow.

**Blockers / what I'm stuck on:** Need to start outreach for user interviews.

**Plan for tomorrow:** Plan project architecture and user flow. Build spend input form with localStorage persistence. Send 5+ outreach messages for user interviews.

## Day 2 — 2026-05-07

**Hours worked:** 4.5

**What I did:** Researched and verified pricing plans for all 8 tools from official pricing pages. Created PRICING_DATA.md with sources. Built ToolEntry component, ToolForm component with localStorage persistence. Fixed hydration error caused by localStorage/SSR mismatch using mounted state pattern.

**What I learned:** Next.js runs components on server first — anything touching browser APIs like localStorage needs protection. Math.random() causes hydration mismatches because server and client produce different values.

**Blockers / what I'm stuck on:**
<br/>

- No user interview replies yet. Posted on Discord, waiting.
- Forgot to commit mid-day due to time blindness — took a break and lost track. Setting a 10pm alarm going forward to protect git history.

**Plan for tomorrow(Day 3):** Build the audit engine — rule-based logic evaluating each tool entry and producing recommendations and savings calculations and set up accounts to reach out to users on different platforms.
