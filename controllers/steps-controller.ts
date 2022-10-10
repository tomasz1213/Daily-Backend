export {};
import { Request, Response, NextFunction } from 'express';
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const postgresQuery = require('../utils/postgresQuery');

const readStepsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const writeStepsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const updateStepsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

exports.readStepsData = readStepsData;
exports.writeStepsData = writeStepsData;
exports.updateStepsData = updateStepsData;
