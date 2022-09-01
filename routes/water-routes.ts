const express = require('express');
const { check } = require('express-validator');
const {
  readWaterData,
  writeWaterData,
  updateWaterData,
} = require('../controllers/water-controller');

const router = express.Router();

router.post(
  '/register',
  check('login').isLength({ min: 3 }),
  writeWaterData
);