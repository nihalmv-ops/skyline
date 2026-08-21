const express = require("express");

const {
  getAllOrders,
  getAdminOrderById,
  updateOrderStatus,
} = require("../controllers/adminOrderController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Get all orders
router.get("/", protect, adminOnly, getAllOrders);

// Get one order
router.get("/:id", protect, adminOnly, getAdminOrderById);

// Update order status
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;