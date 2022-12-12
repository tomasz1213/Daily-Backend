import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
require('dotenv').config();
import { authCheck } from './middleware/auth-check';
import { DataSource } from 'typeorm';
import { WaterHistory } from './entities/WaterHistory';
import { Client } from './entities/Client';

import userRoutes from './routes/user-routes';
import waterRoutes from './routes/water-routes';
import { HttpError } from './models/http-error';
import { Request, Response, NextFunction } from 'express';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Client, WaterHistory],
});

AppDataSource.initialize()
  .then(() => {
    console.log('connected to database');
  })
  .catch((error) => console.log(error));

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
app.use(authCheck);
app.use('/api/water', waterRoutes);

app.use((req: Request, res: Response, next: NextFunction) =>
  next(new HttpError('Could not find route', 404))
);

app.use((error: any, req: Request, res: any, next: NextFunction) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error' });
});

app.listen(5000);
