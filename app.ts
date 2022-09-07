const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/user-routes');
const HttpError = require('./models/http-error');
import { Request, Response, NextFunction } from 'express';

const app = express();

app.use(bodyParser.json());

app.use('/upload/weather', express.static(path.join('upload', 'weather')));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});


app.use('/api/user', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => next(new HttpError('Could not find route', 404)));

app.use((error: any, req: Request, res: any, next: NextFunction) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error' });
});

app.listen(5000);
