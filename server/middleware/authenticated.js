"use strict";

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const jwtSecret = require("../config/config").JWT_Secret;

module.exports = (req, res, next) => {
  if (req.headers.authorization.split(" ")[0] === "TOKEN") {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, jwtSecret.SECRET_KEY, (err, decoded) => {
      req.id = decoded._id;
      req.user = decoded;
      if (err) return next(err);
      User.findById(decoded._id, (err, user) => {
        if (err || !user) return next(err);
        if (user.accessToken.token === token) {
          return next();
        } else {
          return res.json({ success: false, message: "Access denied" });
        }
      });
    });
  } else {
    return res.json({ success: false, message: "Access denied" });
  }
};
