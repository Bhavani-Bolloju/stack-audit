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

## Day 3 — 2026-05-08

**Hours worked:** 4

**What I did:** Planned the full audit engine logic before writing code. Mapped evaluation criteria for all 8 tools — right plan, cheaper same vendor, cheaper alternative, credits opportunity. Researched Cursor plan details (Pro vs Pro+: 3x usage limits). Set up lib/audit/ folder structure. Wrote partial cursor audit logic. Posted user research outreach on Reddit (r/startups, r/Saas).

**What I learned:** Planning the logic before coding saved me from writing something wrong. The four evaluation criteria apply to every tool in the same order — that pattern makes the remaining 7 tools faster to write.

**Blockers / what I'm stuck on:** No user interview replies yet. Audit engine not complete — need to finish all 8 tool functions tomorrow morning first thing.

**Plan for tomorrow:** Finish all 8 audit functions. Wire audit engine to form submit button. Store result and navigate to results page. Start results page UI.

## Day 4 — 2026-05-09

**Hours worked:** 5.5
**What I did:** Completed cursor.ts and copilot.ts audit functions with all 4 evaluation checks. Built getLowerTier and getAlternativeTools helper functions in constants.ts for dynamic recommendations. Tested all 5 scenarios for both tools — all passing.
**What I learned:** Planning logic before coding saved time. Pattern is consistent across tools — remaining 6 will go faster.
**Blockers / what I'm stuck on:** Got one Reddit reply, DM sent for user interview. Still need 2 more. Audit engine not complete — claude, chatgpt, apis, gemini, windsurf remaining.
**Plan for tomorrow:** Finish remaining 6 audit functions first thing. Wire to results page. Start results page UI.

## Day 5 — 2026-05-10

**Hours worked:** 6

**What I did:** Completed all 8 audit functions (claude, chatgpt, gemini, windsurf, anthropic-api, openai-api) with all test scenarios passing. Wired form to results page using Next.js router. Built results page UI with hero savings block, per-tool breakdown cards, Credex CTA for high savings, and email capture placeholder. Added back navigation.

**What I learned:** Planning logic before coding saved significant time — the pattern was consistent across all 8 tools. localStorage key mismatches cause silent bugs that are hard to spot.

**Blockers / what I'm stuck on:** User interviews still at 0/3. Discord DM sent but no reply. Need to try more aggressively tomorrow. Anthropic API, Firebase, Resend, shareable URL all pending.

**Plan for tomorrow:** Anthropic API summary integration. Firebase lead capture. Resend email. Shareable URL + OG tags. CI/CD. Tests. Deploy.

## Day 6 — 2026-05-11

**Hours worked:** 
**What I did:** Integrated Gemini API for AI summary generation with fallback. Set up Firebase Firestore for lead capture. Integrated Resend for transactional emails. Fixed negative savings bug caused by incorrect tier ordering in constants. All 6 MVP features nearly complete — shareable URL remaining.
**What I learned:** Free tier restrictions on both Gemini and Resend require workarounds in development. Tier ordering matters for getLowerTier helper — price order not alphabetical order.
**Blockers / what I'm stuck on:** User interviews still at 0/3. No replies from Reddit or Discord outreach. Need to find people urgently — this is the last day to realistically get interviews done.
**Plan for tomorrow:** Complete shareable URL + OG tags. Deploy to Netlify. CI/CD. 5 tests. All markdown files. Submit.
