const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const ProductController = require("../controllers/product.controller");
const PenawaranController = require("../controllers/penawaran.controller")
const authorize = require("../helpers/auth.helper");
const { check } = require("express-validator");
const multer = require("multer");
const storage = require("../helpers/multer.helper");
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
  (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        next();
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
  ProductController.daftarProduk
);

router.get("/:id", ProductController.getById);

router.post(
  "/",
  upload.single("image_url"),
  authorize,
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
  authorize,
  ProductController.updateProduk
);

router.delete("/:id", authorize, ProductController.deleteProduk);

router.post(
  "/:id/offer",
  authorize,
  (req, res, next) => {
    const errors = [];
   
    if (!req.body.harga) {
      errors.push("Harga required");
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
  PenawaranController.Offer
);

router.get("/offer/:id", authorize, PenawaranController.getDetailOffer);

router.post("/:productId/offer/:penawaranId",authorize,PenawaranController.transaksi);

module.exports = router;