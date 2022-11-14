import { Request } from 'express';
export interface IGetUserAuthInfoRequest extends Request {
  userData: { login: string, id: string };
}
