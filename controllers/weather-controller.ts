export {};
import { Request, Response, NextFunction } from 'express';

const readWeatherData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const writeWeatherData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const updateWeatherData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

exports.readWeatherData = readWeatherData;
exports.writeWeatherData = writeWeatherData;
exports.updateWeatherData = updateWeatherData;
