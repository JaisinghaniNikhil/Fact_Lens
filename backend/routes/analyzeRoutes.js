const express = require("express");
const router = express.Router();
const { analyzeNews } = require("../controllers/analyzeController") ;
const {analyzeLimiter} = require('../middleware/rateLimiter')

router.post("/analyze",analyzeLimiter, analyzeNews);

module.exports = router;
