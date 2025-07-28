const Portfolio = require('../models/portfolio');

// Create portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const existing = await Portfolio.findOne({ user: req.user._id });
    if (existing) return res.status(400).json({ message: 'Portfolio already exists' });

    const portfolio = new Portfolio({
      user: req.user._id,
      ...req.body,
    });

    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (err) {
    console.error('Create Portfolio Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get logged-in user's portfolio
exports.getMyPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    res.json(portfolio);
  } catch (err) {
    console.error('Get Portfolio Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update portfolio
exports.updatePortfolio = async (req, res) => {
  try {
    const updated = await Portfolio.findOneAndUpdate(
      { user: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Portfolio not found' });
    res.json(updated);
  } catch (err) {
    console.error('Update Portfolio Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
