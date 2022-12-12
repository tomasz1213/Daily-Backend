import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Client } from '../entities/Client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { HttpError } from '../models/http-error';

const saltRounds = 10;

export const registerUser = async (req: Request, res: Response) => {
  const id = uuidv4();
  const error = validationResult(req);
  const { login, password, email, name } = req.body;
  const hashPassword = bcrypt.hashSync(password, saltRounds);
  const token = jwt.sign(
    {
      login,
      id,
    },
    'secret-password-same-as-everywhere',
    { expiresIn: '96h' }
  );

  const databaseClient = await Client.findOne({ where: { login } });

  if (databaseClient) {
    if (databaseClient.email) {
      return res.status(411).json({ errors: 'Email is already used' });
    }
    if (databaseClient.login) {
      return res.status(411).json({ errors: 'Login is already used' });
    }
  }

  const client = Client.create({
    user_uid: id,
    token,
    email,
    name,
    login,
    password: hashPassword,
  });

  await client.save();
  return res.json({ token });
};

export const loginUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  const { login, password } = req.body;

  const generatedToken = jwt.sign(
    {
      login,
    },
    'secret-password-same-as-everywhere',
    { expiresIn: '1h' }
  );

  const databaseClient = await Client.findOne({ where: { login: login } });

  if (!databaseClient) {
    return res.status(411).json({ errors: 'User does not exist in database' });
  }

  databaseClient.token = generatedToken;
  const comparePassword = await bcrypt.compare(
    password,
    databaseClient.password
  );

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error });
  }
  if (!comparePassword) {
    return res.status(411).json({ errors: 'Invalid Password' });
  }

  Client.update(databaseClient.user_uid, { token: generatedToken });
  return res.json(databaseClient);
};

export const deleteUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  const { uid } = req.body;

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error });
  }

  const user = Client.delete(uid);
  return res.json(user);
};
