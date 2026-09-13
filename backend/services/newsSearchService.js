// newsSearchService.js
// Wraps a real news search API so the agent has grounded evidence instead
// of guessing from the LLM's training data alone.
//
// Uses NewsAPI (https://newsapi.org) — free tier is fine for a portfolio demo.
// Swap the fetch URL for GNews or Bing News Search if you prefer; the
// return shape below is what the rest of the agent expects.

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2/everything";

// A short allowlist used to bump credibility scoring. Extend as you like —
// this is intentionally simple, not a real credibility model.
const TRUSTED_DOMAINS = [
  "reuters.com",
  "apnews.com",
  "bbc.com",
  "bbc.co.uk",
  "npr.org",
  "theguardian.com",
  "nytimes.com",
  "wsj.com",
  "aljazeera.com",
  "pib.gov.in",
  "thehindu.com",
  "indianexpress.com",
];

function domainFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * Searches for news articles related to a query string.
 * @param {string} query - search terms (Gemini will generate this)
 * @returns {Promise<Array<{title, source, url, publishedAt, domain, trusted}>>}
 */
async function searchNews(query) {
  if (!NEWS_API_KEY) {
    throw new Error("NEWS_API_KEY is not set in your .env file.");
  }

  const params = new URLSearchParams({
    q: query,
    sortBy: "relevancy",
    language: "en",
    pageSize: "8",
    apiKey: NEWS_API_KEY,
  });

  const response = await fetch(`${NEWS_API_URL}?${params.toString()}`);

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`NewsAPI error (${response.status}): ${errBody}`);
  }

  const data = await response.json();

  const articles = (data.articles || []).map((a) => {
    const domain = domainFromUrl(a.url);
    return {
      title: a.title,
      source: a.source?.name || domain,
      url: a.url,
      publishedAt: a.publishedAt,
      domain,
      trusted: TRUSTED_DOMAINS.includes(domain),
    };
  });

  // Surface trusted sources first — helps the model weigh evidence sensibly
  articles.sort((a, b) => Number(b.trusted) - Number(a.trusted));

  return articles;
}

module.exports = { searchNews, TRUSTED_DOMAINS };