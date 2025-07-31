// ✅ Load environment variables from .env
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Ensures .env is read even if run from root

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioroutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Debug log
console.log('🔍 Debug MONGO_URI:', MONGO_URI);

// ✅ Safety check for .env variable
if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env or failed to load');
  process.exit(1);
}

// ✅ Serve static files from /uploads (for images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Middleware
app.use(cors());
app.use(express.json()); // replaces body-parser

// ✅ API Routes
app.use('/api/auth', authRoutes);             // login/register
app.use('/api/portfolio', portfolioRoutes);   // portfolio CRUD

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('🌐 Portfolio CMS Backend is running');
});

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
