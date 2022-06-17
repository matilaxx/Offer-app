const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.route");
const profileRoutes = require("./profile.route");

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/profile", profileRoutes);

module.exports = router;