require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioroutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads')); // ✅ For serving image uploads

// Routes
app.use('/api/auth', authRoutes);             // login/register
app.use('/api/portfolio', portfolioRoutes);   // CRUD + public

// Default root route
app.get('/', (req, res) => {
  res.send('🌐 Portfolio CMS Backend is running');
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
