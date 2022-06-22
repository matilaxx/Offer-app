const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const ProfileController = require("../controllers/profile.controller");

const multer = require("multer");
const storage = require("../services/multer.service");
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/svg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("File type not available"), false);
    }
  },
});

router.get(
  "/get",
  (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        throw {
          status: 401,
          message: "Unauthorized request",
        };
      } else {
        const user = jwt.decode(req.headers.authorization);
        if (user) {
          req.user = user;
          next();
        } else {
          throw {
            status: 401,
            message: "Unauthorized request",
          };
        }
      }
    } catch (err) {
      next(err);
    }
  },
  ProfileController.getProfile
);

router.put(
  "/update",
  (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        throw {
          status: 401,
          message: "Unauthorized request",
        };
      } else {
        const user = jwt.decode(req.headers.authorization);
        if (user) {
          req.user = user;
          next();
        } else {
          throw {
            status: 401,
            message: "Unauthorized request",
          };
        }
      }
    } catch (err) {
      next(err);
    }
  },
  upload.single("image_url"),
  ProfileController.update
);

module.exports = router;
