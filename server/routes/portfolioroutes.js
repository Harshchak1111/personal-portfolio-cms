const express = require('express');
const router = express.Router();

const {
  createPortfolio,
  getMyPortfolio,
  updatePortfolio,
} = require('../controllers/portfolioController');

const authMiddleware = require('../middleware/authMiddleware');

// ✅ Models required for public route
const User = require('../models/user');
const Portfolio = require('../models/portfolio');

// --- Protected Routes ---
router.post('/', authMiddleware, createPortfolio);
router.get('/me', authMiddleware, getMyPortfolio);
router.put('/me', authMiddleware, updatePortfolio);

// --- ✅ Public Portfolio Route ---
router.get('/public/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const projects = await Portfolio.find({ user: user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
