const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Health Check
app.get('/', (req, res) => {
  res.status(200).send('Server is running!');
});

// API Routes
app.use('/api', routes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

module.exports = app;
