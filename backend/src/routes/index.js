const express = require('express');

const authRoutes = require('./authRoutes');
const notesRoutes = require('./notesRoutes');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the API!' });
});

router.use('/auth', authRoutes);
router.use('/notes', notesRoutes);

module.exports = router;
