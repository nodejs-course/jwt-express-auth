require('dotenv').config();
const express = require('express');
const mongoose   = require('mongoose');

const dbURL = `mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`;
mongoose.connect(dbURL);

const app = express();

require('./middlewares')(app);

app.get('/', (req, res) => {
  res.send({
    env: process.env.NODE_ENV
  });
});

app.use('/', require('./api/controllers'));

require('./middlewares/errorHandler')(app);

module.exports = app;