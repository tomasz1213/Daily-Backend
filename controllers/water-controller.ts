import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { WaterHistory } from '../entities/WaterHistory';
import { verify } from 'jsonwebtoken';

export const readWaterData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

interface JwtPayload {
  id: string;
}

export const writeWaterData = async (req: Request, res: Response) => {
  const error = validationResult(req);
  const token = req?.headers?.authorization?.split(' ')[1];
  const { value, time, date } = req.body;

  if (token) {
    const decodedToken = verify(
      token,
      'secret-password-same-as-everywhere'
    ) as JwtPayload;

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error });
    }

    const water = WaterHistory.create({
      value,
      time,
      date,
      user_id: decodedToken.id,
    });
    water.save();
    return res.json('success');
  }
  return res.json('invalid token');
};

export const updateWaterData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
