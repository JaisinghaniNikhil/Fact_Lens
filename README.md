# FactLens

An AI fact-checking agent that verifies claims against real news sources instead of guessing from memory.

**Live:** https://fact-lens-orcin.vercel.app/

## What it does

Paste a headline or claim, and FactLens:
1. Identifies the core factual claim
2. Searches real news sources for evidence (via NewsAPI)
3. Reasons over the retrieved articles — and searches again if evidence is thin or conflicting
4. Returns a verdict (**Likely Real** / **Likely Fake** / **Unverifiable**) with confidence, red flags, credibility signals, and the actual sources it checked

Unlike a single LLM call, this is a tool-calling agent — Gemini decides for itself whether it has enough evidence or needs another search round, and never fabricates sources.

## Stack

- **Frontend:** React (Vite), Tailwind
- **Backend:** Node.js, Express
- **AI:** Gemini API (function calling / tool use)
- **Search grounding:** NewsAPI
- **Infra:** rate limiting (`express-rate-limit`), in-memory caching (`node-cache`), MongoDB for saved articles + auth

## Key engineering decisions

- **Agentic, not single-shot** — grounds every verdict in real retrieved articles rather than the model's training data.
- **Date-awareness fix** — the model's training cutoff predates real deployment dates; the backend explicitly passes today's date so correctly-dated recent articles aren't mistaken for "future" content.
- **Rate limiting + caching** — protects the free-tier Gemini/NewsAPI quota from bursts and repeat queries.
- **Honest "Unverifiable"** — the agent is designed to say "not enough evidence" rather than force a guess on thin coverage.

## Known limitations

- NewsAPI's free tier has limited, mostly English-language source coverage — obscure or hyperlocal claims often correctly return "Unverifiable" simply due to lack of indexed coverage, not a flaw in the reasoning.
- Not a substitute for professional fact-checking — an experimental tool, labeled as such in the UI.

## Setup

```bash
# backend
cd backend
npm install
# add to .env: GEMINI_API_KEY, NEWS_API_KEY, MONGODB_URI, SMTP_* (for feedback form)
npm run dev

# frontend
cd frontend
npm install
npm run dev
```
