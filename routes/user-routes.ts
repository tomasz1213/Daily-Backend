export {};
import express from 'express';
import { check } from 'express-validator';
import {
  registerUser,
  loginUser,
  deleteUser,
} from '../controllers/users-controller';
import { authCheck } from '../middleware/auth-check';

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

router.delete('/delete', deleteUser);

router.post('/checkAuth', authCheck);

export default router;
