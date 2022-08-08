const multer = require('multer');
const uuid = require('uuid');

const MINE_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg',
}

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const ext = MINE_TYPE_MAP[file.mimetype];
      cb(null, uuid.v1() + '.' + ext);
    },
    fileFilter: (req, file, cb) => {
      const isValid = !!MINE_TYPE_MAP[file.mimetype];
      const error = isValid ? null : new Error('Invalid type');
      cb(error, isValid);
    },
  }),
});

module.exports = fileUpload;