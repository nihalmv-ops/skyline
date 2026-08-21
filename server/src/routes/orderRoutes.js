const express = require("express");

const {
  createOrder,
  getMyOrders,
  getMyOrderById,
  cancelOrder,
} = require("../controllers/orderController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Create order
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/my-orders", protect, getMyOrders);

// Get one order
router.get("/:id", protect, getMyOrderById);

// Cancel order
router.put("/:id/cancel", protect, cancelOrder);

module.exports = router;