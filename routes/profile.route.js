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
router.post("/create/:id",upload.single('image_url'), 
ProfileController.create);
router.put("/update/:id",//upload.single('image_url'), 
ProfileController.update);

module.exports = router;
