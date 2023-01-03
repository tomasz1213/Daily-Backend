import { verify } from 'jsonwebtoken';
import { Request} from 'express';

interface JwtPayload {
  id: string;
  login: string; 
}

export const getUserTokenData = (req: Request) => {
  const token = req?.headers?.authorization?.split(' ')[1];
  if (!token) {
    return false;
  }
  const decodedToken = verify(
    token,
    'secret-password-same-as-everywhere'
  ) as JwtPayload;

  return { uuid: decodedToken.id, login: decodedToken.login };
};
