const HttpError = require("../models/http-error");
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { 
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(req.headers);
        if (!token) {
            throw new Error('Authentication failed');
        }
        const decodedToken = jwt.verify(
          token,
          'secret-password-same-as-everywhere'
        );
        req.userData = { login: decodedToken.login };
        next();
    } catch (err) {
        const error = new HttpError('Invalid Token', 401);
        next(error);
    }

};