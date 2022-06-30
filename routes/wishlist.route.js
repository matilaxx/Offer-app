const express = require("express");
const router = express.Router();
const WishlistController = require("../controllers/wishlist.controller");
const authorize = require("../helpers/auth.helper");

router.get("/", authorize, WishlistController.getWishlist)
router.post("/", authorize, WishlistController.add);
router.delete("/:id", authorize, WishlistController.remove);

module.exports = router;
