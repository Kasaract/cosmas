const express = require('express');

const { registerUser, loginUser, logoutUser, getUser } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', authenticate, getUser);

module.exports = router;
