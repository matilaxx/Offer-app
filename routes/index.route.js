const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.route");
const profileRoutes = require("./profile.route");
const authProducts = require("./product.route");

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/profile", profileRoutes);
router.use("/api/v1/product", authProducts);

module.exports = router;