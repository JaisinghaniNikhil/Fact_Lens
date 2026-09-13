const express = require('express')
const { login,signup,getUser,uploadImage } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/signup',signup);
router.post('/login',login);

router.get('/me',authMiddleware,getUser);
router.post('/upload-image',authMiddleware,upload.single('image'),uploadImage);

module.exports = router