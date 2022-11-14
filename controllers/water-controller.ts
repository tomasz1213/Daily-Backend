export {};
import { Request, Response, NextFunction } from 'express';
const { validationResult } = require('express-validator');
const postgresQuery = require('../utils/postgresQuery');
const jwt = require('jsonwebtoken');

const readWaterData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const writeWaterData = async (
  req: Request,
  res: Response,
) => {
  const error = validationResult(req);
  const token = req?.headers?.authorization?.split(' ')[1];
  const { value, time, date } = req.body;
  const decodedToken = jwt.verify(token, 'secret-password-same-as-everywhere');
  const registerQuery = {
    text: 'INSERT INTO water_history (  value, time, date, user_id ) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [value, time, date, decodedToken.id],
  };

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.errors });
  }

  return await postgresQuery(registerQuery)
    .then(() => res.json('success'))
    .catch((error: any) => res.status(500).json({ errors: error }));
};

const updateWaterData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

exports.readWaterData = readWaterData;
exports.writeWaterData = writeWaterData;
exports.updateWaterData = updateWaterData;
