// analyzeNews.controller.js
// The actual agent loop: Gemini can call search_news as many times as it
// decides it needs (capped at MAX_TOOL_ROUNDS for cost/safety), then
// produces a final grounded verdict with real cited sources.

const { GEMINI_URL, SEARCH_TOOL, SYSTEM_PROMPT } = require("../config/geminiAgentConfig");
const { searchNews } = require("../services/newsSearchService");

// ===== NEW: import the cache helpers =====
const { getCachedResult, setCachedResult } = require("../services/analysisCache");
// ===========================================

const MAX_TOOL_ROUNDS = 3;

async function callGemini(contents) {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      tools: [SEARCH_TOOL],
      generationConfig: { temperature: 0.2 },
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${JSON.stringify(errData)}`);
  }

  return response.json();
}

function extractFunctionCall(geminiData) {
  const parts = geminiData.candidates?.[0]?.content?.parts || [];
  return parts.find((p) => p.functionCall)?.functionCall || null;
}

function extractText(geminiData) {
  const parts = geminiData.candidates?.[0]?.content?.parts || [];
  return parts.map((p) => p.text || "").join("");
}

function parseJsonFromText(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  const cleaned = match[0]
    .replace(/```json|```/g, "")
    .replace(/,\s*}/g, "}")
    .replace(/,\s*]/g, "]")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

const analyzeNews = async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length === 0) {
    return res.status(400).json({ error: "No text provided." });
  }

  // ===== NEW: check the cache before doing anything expensive =====
  // If we've already verified this exact claim recently, hand back the
  // saved answer instantly — zero Gemini calls, zero NewsAPI calls spent.
  const cached = getCachedResult(text);
  if (cached) {
    console.log("[cache] hit — returning saved result, no API calls spent");
    return res.status(200).json({ ...cached, _cached: true });
  }
  // ===================================================================

  // Gemini's training data has a cutoff well before "today" — without this,
  // it treats correctly-dated recent articles (e.g. 2026) as suspicious
  // "future dated" content and wrongly flags them as red flags. Telling it
  // the real current date fixes that.
  const todayStr = new Date().toISOString().split("T")[0]; // e.g. "2026-09-12"

  // Running conversation history, per Gemini's multi-turn function-calling format
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `${SYSTEM_PROMPT}\n\nToday's real-world date is ${todayStr}. Articles dated on or before this date are NOT "future" or suspicious just for having a recent date — treat recency as normal, not as a red flag.\n\nClaim to check:\n${text}`,
        },
      ],
    },
  ];

  const searchLog = []; // for debugging / optionally showing the user what was searched

  try {
    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
      const geminiData = await callGemini(contents);
      const functionCall = extractFunctionCall(geminiData);

      if (functionCall && functionCall.name === "search_news" && round < MAX_TOOL_ROUNDS) {
        const query = functionCall.args?.query || text;
        console.log(`[agent] round ${round}: searching for "${query}"`);

        let articles = [];
        try {
          articles = await searchNews(query);
        } catch (searchErr) {
          console.error("Search failed:", searchErr.message);
          articles = []; // let the model know the search came back empty
        }

        searchLog.push({ query, resultCount: articles.length });

        // Append the model's function call, then our function response,
        // so the next round has full context.
        contents.push({ role: "model", parts: [{ functionCall }] });
        contents.push({
          role: "function",
          parts: [
            {
              functionResponse: {
                name: "search_news",
                response: { articles },
              },
            },
          ],
        });
        continue; // let the model take another turn with the new evidence
      }

      // No more tool calls — this should be the final answer
      const fullText = extractText(geminiData);
      const parsed = parseJsonFromText(fullText);

      if (!parsed) {
        console.error("No parseable JSON in final response:\n", fullText);
        return res.status(500).json({
          error: "Agent did not return a valid verdict. Please try again.",
        });
      }

      const result = {
        verdict: parsed.verdict || "Unverifiable",
        confidence: parsed.confidence ?? 50,
        summary: parsed.summary || "",
        redFlags: parsed.redFlags || [],
        positiveSignals: parsed.positiveSignals || [],
        citedSources: parsed.citedSources || [],
      };

      // ===== NEW: save the result to cache before returning it =====
      setCachedResult(text, result);
      // ================================================================

      return res.status(200).json({
        ...result,
        _debug: { searchRounds: searchLog }, // remove in production if you don't want this exposed
      });
    }

    // Hit MAX_TOOL_ROUNDS without a final answer
    return res.status(500).json({
      error: "Agent exceeded max search rounds without reaching a verdict.",
    });
  } catch (err) {
    console.error("Controller error:", err.message);
    return res.status(500).json({ error: "Something went wrong on the server." });
  }
};

module.exports = { analyzeNews };