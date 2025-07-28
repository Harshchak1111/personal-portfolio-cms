const express = require('express');
const router = express.Router();

// ✅ Update path based on your folder structure
const { register, login } = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

module.exports = router;
