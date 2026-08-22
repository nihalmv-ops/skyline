const express = require("express");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminProductController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Create
router.post(
  "/",
  protect,
  adminOnly,
  createProduct
);

// Get all
router.get(
  "/",
  protect,
  adminOnly,
  getAllProducts
);

// Get one
router.get(
  "/:id",
  protect,
  adminOnly,
  getProductById
);

// Update
router.put(
  "/:id",
  protect,
  adminOnly,
  updateProduct
);

// Deactivate
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

module.exports = router;