const express = require('express');
const { check } = require('express-validator');
const {
  readWaterData,
  writeWaterData,
  updateWaterData,
} = require('../controllers/water-controller');
const checkAuth = require('../middleware/auth-check');

const router = express.Router();

router.post(
  '/register',
  check('value').isLength({ min: 2 }),
  check('time').isLength({ min: 5 }),
  check('date').isLength({ min: 5 }),
  writeWaterData
);

module.exports = router;
