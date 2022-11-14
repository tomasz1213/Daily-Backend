import { Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../utils/user-type';
const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');

module.exports = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed');
    }
    const decodedToken = jwt.verify(
      token,
      'secret-password-same-as-everywhere'
    );
    req.userData = { login: decodedToken.login, id: decodedToken.id };
    next();
  } catch (err) {
    const error = new HttpError('Invalid Token', 401);
    next(error);
  }
};
