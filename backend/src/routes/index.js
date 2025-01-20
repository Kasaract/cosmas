const express = require('express');

const authRoutes = require('./authRoutes');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the API!' });
});

// Auth Routes
router.use('/auth', authRoutes);

module.exports = router;
