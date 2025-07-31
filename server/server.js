const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioroutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('🔍 Debug MONGO_URI:', MONGO_URI);

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env or failed to load');
  process.exit(1);
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const cors = require('cors');

const allowedOrigins = [
  'https://personal-portfolio-cms-jwbs.vercel.app',
  'https://personal-portfolio-cms-jwbs-ihqgb7gwb-harshs-projects-8c867ff6.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));




app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

app.get('/', (req, res) => {
  res.send('🌐 Portfolio CMS Backend is running');
});

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