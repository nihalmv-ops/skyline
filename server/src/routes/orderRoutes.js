const express = require("express");

const {
  createOrder,
} = require("../controllers/orderController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Create order / checkout
router.post("/", protect, createOrder);

module.exports = router;