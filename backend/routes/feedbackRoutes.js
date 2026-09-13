const express = require('express');
const { sendFeedback } = require('../controllers/feedbackController');
const {generalRateLimit} = require('../middleware/rateLimiter')

const router = express.Router();


router.post('/feedback',generalRateLimit, sendFeedback);

module.exports = router;
