import { Request, Response, NextFunction } from 'express';
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const postgresQuery = require('../utils/postgresQuery');

const saltRounds = 10;


const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  const { login, password, email, name } = req.body;
  const hashPassword = bcrypt.hashSync(password, saltRounds);
  const token = jwt.sign(
    {
      login,
    },
    process.env.TOKEN_SECRET_PASSWORD,
    { expiresIn: '96h' }
  );
  const checkUserQuery = {
    text: 'SELECT * FROM users WHERE login = $1 OR email = $2',
    values: [login, email],
  };
  const registerQuery = {
    text: 'INSERT INTO users (user_uid, token, email, name, login, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    values: [uuidv4(), token, email, name, login, hashPassword],
  };
  const { rows } = await postgresQuery(checkUserQuery);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.errors });
  }
  if (rows.find((user: { email: string }) => email === user.email)) {
    return res.status(411).json({ errors: 'Email is already used' });
  }
  if (rows.find((user: { login: string }) => login === user.login)) {
    return res.status(411).json({ errors: 'Login is already used' });
  }

  await postgresQuery(registerQuery)
    .then(() => res.json({ token }))
    .catch(() => res.status(500).json({ errors: 'Server Error' }));
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  const { login, password } = req.body;

  const generatedToken = jwt.sign(
    {
      login,
    },
    process.env.TOKEN_SECRET_PASSWORD,
    { expiresIn: '1h' }
  );
  const updateTokenQuery = {
    text: 'UPDATE users SET token = $1 WHERE login = $2',
    values: [generatedToken, login],
  };
  const checkUserQuery = {
    text: 'SELECT * FROM users WHERE login = $1',
    values: [login],
  };
  const { rows } = await postgresQuery(checkUserQuery);
  const userData = rows?.find(
    (user: { login: string }) => user.login === login
  );
  userData.token = generatedToken;

  const comparePassword = await bcrypt.compare(password, userData.password);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.errors });
  }
  if (!comparePassword) {
    return res.status(411).json({ errors: 'Invalid Password' });
  }

  await postgresQuery(updateTokenQuery)
    .then(() => res.json(userData))
    .catch(() => res.status(500).json({ errors: 'Server Error' }));
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
