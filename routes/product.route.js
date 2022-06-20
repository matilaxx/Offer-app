const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const ProductController = require("../controllers/product.controller");

const multer  = require('multer')
const storage = require('../services/multer.service')
const upload = multer(
    { 
        storage: storage,
        fileFilter: (req,file,cb) => {
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/svg' ) {
                cb(null,true)
            }else {
                cb(new Error('File type not available'),false)               
            }
        }
    }
)



router.get('/', ProductController.daftarProduk)
router.get('/:id', ProductController.getById)
router.post(
  '/tambahProduk',
  (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        throw {
          status: 401,
          message: 'Unauthorized request'
        }
      } else {
        const user = jwt.decode(req.headers.authorization)
        if (user) {
          req.user = user
          next()
        } else {
          throw {
            status: 401,
            message: 'Unauthorized request'
          }
        }
      }
    } catch (err) {
      next(err)
    }
  },
  upload.single('image_url'),ProductController.tambahProduk);

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
