const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");

router.post(
  "/login",
  (req, res, next) => {
    const errors = [];
    if (!req.body.email) {
      errors.push("Email required");
    }
    if (!req.body.password) {
      errors.push("Password required");
    }

    if (errors.length > 0) {
      next({
        status: 400,
        message: errors,
      });
    } else {
      next();
    }
  },
  AuthController.login
);

router.post(
  "/register",
  (req, res, next) => {
    const errors = [];
    if (!req.body.nama) {
      errors.push("Nama required");
    }
    if (!req.body.email) {
      errors.push("Email required");
    }
    if (!req.body.password) {
      errors.push("Password required");
    } else if (req.body.password.length < 8) {
      errors.push("Password at least 8 character");
    }

    if (errors.length > 0) {
      next({
        status: 400,
        message: errors,
      });
    } else {
      next();
    }
  },
  AuthController.register
);

module.exports = router;
