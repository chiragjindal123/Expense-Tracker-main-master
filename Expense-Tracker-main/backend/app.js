const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from your frontend

// Routes
try {
  readdirSync('./routes').map((route) => {
    app.use('/api/v1', require('./routes/' + route));
  });
} catch (error) {
  console.error('Routes directory not found:', error);
}

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('Listening to port:', PORT);
  });
};

server();
