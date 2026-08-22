const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Total products
    const totalProducts = await Product.countDocuments();

    // Total orders
    const totalOrders = await Order.countDocuments();

    // Total sales
    const salesResult = await Order.aggregate([
      {
        $match: {
          orderStatus: {
            $ne: "cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalSales =
      salesResult.length > 0
        ? salesResult[0].totalSales
        : 0;

    // Recent orders
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    // Low stock products
    const lowStockProducts = await Product.find({
      stock: {
        $lte: 10,
      },
    })
      .select("name price stock")
      .sort({ stock: 1 })
      .limit(10);

    res.status(200).json({
      success: true,

      statistics: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalSales,
      },

      recentOrders,

      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};