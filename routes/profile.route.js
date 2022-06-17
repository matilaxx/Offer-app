const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile.controller");

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

router.get("/get/:id", ProfileController.getProfile);
router.post("/create/:id", upload.single('image_url'),
(req, res, next) => {
    const errors = [];
    if (!req.body.kota) {
      errors.push("Kota required");
    }
    if (!req.body.alamat) {
      errors.push("Alamat required");
    }
    if (!req.body.no_handphone) {
      errors.push("Nomer Handphone required");
    }
    else if (!req.file.path) {
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
 ProfileController.create);
router.put("/update/:id",
// (req, res, next) => {
//     const errors = [];
//     if (!req.body.nama) {
//       errors.push("Nama required");
//     }
//     if (!req.body.email) {
//       errors.push("Email required");
//     }
//     if (!req.body.password) {
//       errors.push("Password required");
//     }
//     else if (req.body.password.length < 8) {
//       errors.push("Password at least 8 character");
//     }

//     if (errors.length > 0) {
//       next({
//         status: 400,
//         message: errors,
//       });
//     } else {
//       next();
//     }
//   }, 
  upload.single('image_url'),ProfileController.update);

module.exports = router;
