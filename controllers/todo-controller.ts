export {};
import { Request, Response, NextFunction } from 'express';
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const postgresQuery = require('../utils/postgresQuery');

const readToDoData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const writeToDoData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const updateToDoData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

exports.readToDoData = readToDoData;
exports.writeToDoData = writeToDoData;
exports.updateToDoData = updateToDoData;
