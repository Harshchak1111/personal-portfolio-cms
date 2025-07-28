const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:      { type: String, required: true },
  bio:       { type: String },
  skills:    [String],
  projects:  [{
    title:       String,
    description: String,
    link:        String
  }],
  contact: {
    email:    String,
    phone:    String,
    linkedin: String,
    github:   String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
