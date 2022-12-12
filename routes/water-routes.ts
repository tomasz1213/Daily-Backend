import express from 'express';
import { check } from 'express-validator';
import {
  readWaterData,
  writeWaterData,
  updateWaterData,
} from '../controllers/water-controller';

const router = express.Router();

router.post(
  '/register',
  check('value').isLength({ min: 2 }),
  check('time').isLength({ min: 5 }),
  check('date').isLength({ min: 5 }),
  writeWaterData
);

export default router;
