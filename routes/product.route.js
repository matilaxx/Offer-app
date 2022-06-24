const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller");
const authoriz = require("../helpers/auth.helpers")

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
  "/",
  authoriz,ProductController.daftarProduk
);

router.get("/:id", ProductController.getById);

router.post(
  "/",
  upload.single("image_url"),authoriz,
  (req, res, next) => {
    const errors = [];
    if (!req.body.nama) {
      errors.push("Nama required");
    }
    if (!req.body.deskripsi) {
      errors.push("Deskripsi required");
    }
    if (!req.body.harga) {
      errors.push("Harga required");
    }
    if (req.file.fieldname !== "image_url") {
      errors.push("Image required");
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
  ProductController.tambahProduk
);

router.put(
  "/:id",
  upload.single("image_url"),
  authoriz,ProductController.updateProduk
);

router.delete(
  "/:id",
  authoriz,ProductController.deleteProduk
);

module.exports = router;
