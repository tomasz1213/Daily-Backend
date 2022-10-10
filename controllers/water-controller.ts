export {};
import { Request, Response, NextFunction } from 'express';
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const postgresQuery = require('../utils/postgresQuery');

const readWaterData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

};

const writeWaterData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const error = validationResult(req);
    const { id, value , time, date, user_id } = req.body;

    const registerQuery = {
      text: 'INSERT INTO water_history (  value, time, date, user_id ) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [ value, time, date, user_id],
    };

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.errors });
    }

    await postgresQuery(registerQuery)
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