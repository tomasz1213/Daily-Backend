const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const postgresQuery = require('../utils/postgresQuery');

let DUMMY_USER = [
  {
    id: 'p1',
    login: 'Empire State Building',
    name: 'Famous',
    email: 'u1',
    password: 'dgoiup',
  },
  {
    id: 'p2',
    login: 'Empire State Building',
    name: 'Famous',
    email: 'u1',
    password: 'dgoiup',
  },
];

const getAllUsers = (req, res, next) => {
  const place = DUMMY_USER;

  res.json({ place });
};

const registerUser = async (req, res, next) => {
  const error = validationResult(req);
  const { login, password, email, name } = req.body;
  const token = jwt.sign(
    {
      login,
    },
    process.env.TOKEN_SECRET_PASSWORD,
    { expiresIn: '96h' }
  );

  const query = {
    text: 'INSERT INTO users (user_uid, token, email, name, login, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    values: [uuidv4(), token, email, name, login, password],
  };

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.errors });
  }
  if (DUMMY_USER.find((user) => email === user.email)) {
    return res.status(411).json({ errors: 'Email is already used' });
  }
  await postgresQuery(query);
  res.json({ token });
};

const loginUser = (req, res, next) => {
  const error = validationResult(req);
  const { login, password } = req.body;
  const getUserData = DUMMY_USER.findIndex((user) => login === user.login);
  const generatedToken = jwt.sign(
    {
      login,
    },
    'secret-password-same-as-everywhere',
    { expiresIn: '1h' }
  );

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.errors });
  }
  if (DUMMY_USER[getUserData].password !== password) {
    return res.status(411).json({ errors: 'Invalid Password' });
  }
  const user = {
    ...DUMMY_USER[getUserData],
    token: generatedToken,
  };
  DUMMY_USER[getUserData] = user;
  res.json(user);
};

exports.getAllUsers = getAllUsers;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
