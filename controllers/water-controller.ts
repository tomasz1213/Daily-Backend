import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { verify } from 'jsonwebtoken';
import { WaterHistory } from '../entities/WaterHistory';
import { getUserTokenData } from '../utils/getUserTokenData';

interface JwtPayload {
  id: string;
}

export const readWaterData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const uuid = getUserTokenData(req);
  if (!uuid) {
    return res.status(501).json({ errors: 'Invalid Token' });
  }
  const waterData = await WaterHistory.find({
    where: { user_id: uuid.uuid },
  });

  return res.json(waterData);
};

export const writeWaterData = async (req: Request, res: Response) => {
  const error = validationResult(req);
  const token = req?.headers?.authorization?.split(' ')[1];
  const { value, time, date } = req.body;

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error });
  }

  if (token) {
    const decodedToken = verify(
      token,
      'secret-password-same-as-everywhere'
    ) as JwtPayload;

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
