# Stack-Audit
An AI spend audit tool for startups

## Screenshorts
### Tool Form
<img width="600" height="auto" alt="StackAudit-—-AI-Spend-Audit-Form" src="https://github.com/user-attachments/assets/3deedfd4-896c-4281-b4a9-fdd4d14b49a1" />

### Audit results page
<img width="600" height="auto" alt="StackAudit-—-AI-Spend-Audit-savingAndToolCard" src="https://github.com/user-attachments/assets/189a8bf2-4ac4-45d9-8934-5e689123e8e3" />
<img width="600" height="auto" alt="StackAudit-—-AI-Spend-Audit-AISummaryAndEmailCapture" src="https://github.com/user-attachments/assets/778c448e-1cb3-437f-af75-28c6170f2c80" />


## Decisions

1. **Hardcoded audit rules over AI** — audit logic is pure if/else, not LLM. More predictable, defensible, and cheaper at scale. AI only used for the personalized summary paragraph.

2. **localStorage + Firebase dual storage** — localStorage for instant load on the same device, Firebase as fallback for shareable URLs on other devices.

3. **Team size as proxy for usage intensity** — no access to vendor usage APIs. Team size is the best available signal for whether a higher plan tier is justified.

4. **Gemini API over Anthropic** — Anthropic API requires minimum $5 credit purchase. Gemini free tier covers MVP volume with same output quality.

5. **Honeypot over hCaptcha for abuse protection** — zero friction for real users, no external dependency, sufficient for MVP volume. hCaptcha would be added at scale.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



