# REFLECTION.md

## 1. Hardest Bug

Two bugs stood out. 
- First, setting up Jest — installed all required packages but tests wouldn't run. Fixed by adding `"types": ["jest"]` to `tsconfig.json`. 
- Second and harder: the Gemini API summary appeared to work — network tab showed 200 OK, response said success — but the fallback summary kept showing. I kept checking the browser console forgetting the API route runs server-side. Had to check the terminal instead. Found the error: gemini-2.0-flash hit quota limits on free tier. Switched to gemini-2.5-flash and it worked. The lesson: server-side errors don't show in browser devtools.

## 2. Decision Reversed

Initially tried to build tier recommendation logic based purely on plan features — what each tier actually gives you. Quickly realized this was impossible without knowing the user's actual usage patterns. Reversed the decision mid-week: use team size as a proxy for usage intensity instead. A small team on an enterprise plan is probably over-provisioned regardless of features. It's not perfect but it's defensible and honest. Documented the limitation in ARCHITECTURE.md rather than pretending it doesn't exist.

## 3. Week 2 Build

First priority: integrate directly with vendor APIs to pull actual usage data instead of relying on team size as a proxy. If Cursor tells us a user has hit their rate limit 0 times this month — that's a real signal to downgrade, not an estimate. Second: per-tool use case selection instead of one use case for the whole team. A company might use Cursor for engineering and Claude for marketing — the audit should reflect that. Third: benchmark mode — "your AI spend per developer is $X, companies your size average $Y."

## 4. How I Used AI

Used Claude throughout the week for planning, architecture decisions, reality checks, and generating boilerplate code for integrations (Firebase, Resend, Gemini API). It saved significant time on setup and documentation.

What I didn't trust AI with: the audit engine logic. I wrote and tested every condition myself — overprovisioned seats, tier downgrades, wrong tool suggestions — and ran test cases manually for all 5 scenarios per tool. Good thing too — AI suggested incorrect tier ordering that caused negative savings calculations. I caught it during testing and fixed it by reordering tiers by price in constants.ts. AI also suggested hardcoded static values where dynamic references from constants were more correct — caught and fixed that too.

## 5. Self-Rating

- **Discipline: 6/10** — showed up every day but time blindness caused missed commits and no user interviews completed despite repeated outreach attempts.

- **Code quality: 7/10** — TypeScript throughout, clean folder structure, caught and fixed my own bugs, but some files got messy under time pressure.

- **Design sense: 6/10** — results page looks clean and functional but relied on provided code rather than designing from scratch. UI improvements reserved for post-submission.

- **Problem-solving: 8/10** — debugged hydration errors, negative savings bugs, API failures, and tier ordering issues independently and correctly.

- **Entrepreneurial thinking: 5/10** — understood the business model deeply and wrote thoughtful GTM and ECONOMICS files, but failed to complete user interviews which is a significant gap in founder thinking.
