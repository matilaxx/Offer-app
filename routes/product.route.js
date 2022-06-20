const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller");

router.get('/', ProductController.daftarProduk)
router.get('/:id', ProductController.getById)
router.post(
  '/tambahProduk',
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
    else if (!req.body.image_url) {
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
)
router.put(
  '/updateProduk/:id',
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
    else if (!req.body.image_url) {
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

  ProductController.updateProduk
)
router.delete("/deleteProduk/:id", ProductController.deleteProduk);

module.exports = router;
