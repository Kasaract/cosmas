const express = require('express');

const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login an existing user
router.post('/login', loginUser);

// Get user profile (protected route)
router.get('/profile', authenticate, getProfile);

module.exports = router;
