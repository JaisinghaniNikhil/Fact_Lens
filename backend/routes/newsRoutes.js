const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  saveArticle,
  getSavedArticles,
  deleteSavedArticle,
} = require('../controllers/newsController');

router.post('/save', authMiddleware, saveArticle);
router.get('/saved/:userId', authMiddleware, getSavedArticles);
router.delete('/saved/:id', authMiddleware, deleteSavedArticle);

module.exports = router;
