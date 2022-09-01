export {};
const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/users-controller');
const checkAuth = require('../middleware/auth-check');

const router = express.Router();

router.post(
  '/register',
  check('email').isEmail(),
  check('login').isLength({ min: 3 }),
  check('name').isLength({ min: 1 }),
  check('password').isLength({ min: 5 }),
  registerUser
);

router.post(
  '/login',
  check('login').isLength({ min: 3 }),
  check('password').isLength({ min: 5 }),
  loginUser
);

router.post('/checkAuth', checkAuth);

module.exports = router;
