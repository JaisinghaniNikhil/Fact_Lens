const SavedArticle = require('../model/SavedArticle');

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
