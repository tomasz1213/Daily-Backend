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
) => {};

const updateWaterData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

exports.readWaterData = readWaterData;
exports.writeWaterData = writeWaterData;
exports.updateWaterData = updateWaterData;