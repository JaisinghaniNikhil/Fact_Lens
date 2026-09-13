const mongoose = require('mongoose');

// Saved news article tied to a user (from NewsAPI on the client)
const savedArticleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    url: { type: String, required: true },
    urlToImage: { type: String, default: '' },
    category: { type: String, default: 'general' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SavedArticle', savedArticleSchema);
