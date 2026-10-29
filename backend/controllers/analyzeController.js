// analyzeNews.controller.js
const { GEMINI_URL, SEARCH_TOOL, SYSTEM_PROMPT } = require("../config/geminiAgentConfig");
const { searchNews } = require("../services/newsSearchService");
const { getCachedResult, setCachedResult } = require("../services/analysisCache");

const MAX_TOOL_ROUNDS = 3;
const MAX_RETRIES = 3;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callGemini(contents, attempt = 0) {
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
    const retryable = response.status === 503 || response.status === 429;
    if (retryable && attempt < MAX_RETRIES) {
      const delay = 1000 * 2 ** attempt; // 1s, 2s, 4s
      console.warn(`[gemini] ${response.status}, retrying in ${delay}ms`);
      await sleep(delay);
      return callGemini(contents, attempt + 1);
    }
    const errData = await response.json().catch(() => ({}));
    const err = new Error(`Gemini API error: ${JSON.stringify(errData)}`);
    err.status = response.status;
    throw err;
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
    .replace(/\\(?!["\\/bfnrtu])/g, "") // drop invalid escapes like \'
    .replace(/,\s*}/g, "}")
    .replace(/,\s*]/g, "]")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON parse failed:", e.message);
    return null;
  }
}

const analyzeNews = async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length === 0) {
    return res.status(400).json({ error: "No text provided." });
  }

  const cached = getCachedResult(text);
  if (cached) {
    console.log("[cache] hit — returning saved result, no API calls spent");
    return res.status(200).json({ ...cached, _cached: true });
  }

  const todayStr = new Date().toISOString().split("T")[0];

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

  const searchLog = [];

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
          articles = [];
        }

        searchLog.push({ query, resultCount: articles.length });

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
        continue;
      }

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

      setCachedResult(text, result);

      return res.status(200).json({
        ...result,
        _debug: { searchRounds: searchLog },
      });
    }

    return res.status(500).json({
      error: "Agent exceeded max search rounds without reaching a verdict.",
    });
  } catch (err) {
    console.error("Controller error:", err.message);
    if (err.status === 503 || err.status === 429) {
      return res.status(503).json({
        error: "The AI service is busy right now. Please try again in a minute.",
      });
    }
    return res.status(500).json({ error: "Something went wrong on the server." });
  }
};

module.exports = { analyzeNews };