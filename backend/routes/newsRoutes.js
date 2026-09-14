const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getHeadlines,
  saveArticle,
  getSavedArticles,
  deleteSavedArticle,
} = require('../controllers/newsController');

// Headlines are public data, not user-specific, so no authMiddleware needed
// here — but the /user/dashboard page itself is already gated behind login
// on the frontend, so in practice only logged-in users reach this call.
router.get('/headlines', getHeadlines);

router.post('/save', authMiddleware, saveArticle);
router.get('/saved/:userId', authMiddleware, getSavedArticles);
router.delete('/saved/:id', authMiddleware, deleteSavedArticle);

module.exports = router;