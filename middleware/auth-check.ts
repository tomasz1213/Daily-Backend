import { Response, NextFunction, Request } from 'express';
import { IGetUserAuthInfoRequest } from '../utils/user-type';
import { HttpError } from '../models/http-error';
import { verify } from 'jsonwebtoken';
interface JwtPayload {
  id: string;
  login: string;
}

export const authCheck = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed');
    }
    const decodedToken = verify(
      token,
      'secret-password-same-as-everywhere'
    ) as JwtPayload;

    req.userData = {
      login: decodedToken.login,
      id: decodedToken.id,
    };
    return next();
  } catch (err) {
    const error = new HttpError('Invalid Token', 401);
    return next(error);
  }
};
