const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/user-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use(bodyParser.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));



app.use('/api/user', userRoutes);
app.use((req, res, next) => next(new HttpError('Could not find route', 404)));

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error' });
});

app.listen(5000);
