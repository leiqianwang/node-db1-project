const express = require('express');
const accountsRouter = require('./accounts/accounts-router'); // Adjust the path to where your accounts router is located

const server = express();

// Middleware to parse JSON bodies
server.use(express.json());

// Accounts API route
server.use('/api/accounts', accountsRouter);

// Catch-all for unmatched routes
server.use('*', (req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});


module.exports = server;