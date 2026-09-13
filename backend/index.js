require('dotenv').config();

const express = require('express');
const cors = require('cors');
const App = express();

const analyzeRoutes = require('./routes/analyzeRoutes');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const PORT = process.env.PORT;
const ConnectDB = require('./config/db');

App.use(cors());
App.use(express.json());

App.use('/api/auth',authRoutes);

App.use('/api/news', newsRoutes);
App.use('/api',analyzeRoutes);
App.use('/api', feedbackRoutes);
ConnectDB();

App.listen(PORT,() => {
    console.log(`Server Started on PORT ${PORT}`);
})
