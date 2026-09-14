const SavedArticle = require('../model/SavedArticle');

// Maps our category keys to search terms for the /v2/everything endpoint.
// We use /v2/everything instead of /v2/top-headlines because NewsAPI's
// free tier has very sparse source coverage for top-headlines with
// country=in — many category/country combos legitimately return zero
// results. /v2/everything searches a much larger index and is what
// FactLens's own agent already uses successfully.
const CATEGORY_QUERIES = {
  business: 'India business economy',
  sports: 'India sports cricket',
  politics: 'India politics government',
  technology: 'India technology startup',
  entertainment: 'India entertainment bollywood',
};

// GET /api/news/headlines?category=business
exports.getHeadlines = async (req, res) => {
  try {
    const { category } = req.query;

    if (!process.env.NEWS_API_KEY) {
      return res.status(500).json({ message: 'NEWS_API_KEY is not configured on the server.' });
    }

    const query = category && CATEGORY_QUERIES[category]
      ? CATEGORY_QUERIES[category]
      : 'India news'; // default "Top 10" view

    const params = new URLSearchParams({
      q: query,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: category ? '20' : '10',
      apiKey: process.env.NEWS_API_KEY,
    });

    const response = await fetch(`https://newsapi.org/v2/everything?${params.toString()}`);

    if (!response.ok) {
      const errBody = await response.text();
      console.error('NewsAPI everything error:', errBody);
      return res.status(502).json({ message: 'Could not fetch headlines right now.' });
    }

    const data = await response.json();
    res.status(200).json(data.articles || []);
  } catch (err) {
    console.error('getHeadlines error:', err.message);
    res.status(500).json({ message: 'Could not fetch headlines right now.' });
  }
};

// POST /api/news/save — body: title, description, url, urlToImage, category
exports.saveArticle = async (req, res) => {
  try {
    const { title, description, url, urlToImage, category } = req.body;
    if (!title || !url) {
      return res.status(400).json({ message: 'Title and url are required' });
    }

    const userId = req.user.id;
    const existing = await SavedArticle.findOne({ userId, url });
    if (existing) {
      return res.status(200).json({ message: 'Already saved', article: existing });
    }

    const article = await SavedArticle.create({
      userId,
      title,
      description: description || '',
      url,
      urlToImage: urlToImage || '',
      category: category || 'general',
    });

    res.status(201).json({ message: 'Article saved', article });
  } catch (err) {
    res.status(500).json({ message: 'Could not save article' });
  }
};

// GET /api/news/saved/:userId — only the logged-in user can read their own list
exports.getSavedArticles = async (req, res) => {
  try {
    const { userId } = req.params;
    if (String(userId) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Not allowed to view these saves' });
    }

    const articles = await SavedArticle.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Could not load saved articles' });
  }
};

// DELETE /api/news/saved/:id
exports.deleteSavedArticle = async (req, res) => {
  try {
    const article = await SavedArticle.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    if (String(article.userId) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Not allowed to delete this article' });
    }

    await SavedArticle.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Removed from saved' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete article' });
  }
};