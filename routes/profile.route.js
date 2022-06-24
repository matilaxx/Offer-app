const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile.controller");

const multer = require("multer");
const storage = require("../services/multer.service");
const authoriz = require("../helpers/auth.helpers");
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
  authoriz,ProfileController.getProfile
);

router.put(
  "/update",
  authoriz,upload.single("image_url"),
  ProfileController.update
);

module.exports = router;
