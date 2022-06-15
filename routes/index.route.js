const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.route");

router.use("/api/v1/auth", authRoutes);

module.exports = router;
