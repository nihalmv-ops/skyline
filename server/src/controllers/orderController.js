const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

// CREATE ORDER / CHECKOUT
const createOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod = "COD",
    } = req.body;

    // 1. Validate shipping address
    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete shipping address is required",
      });
    }

    // 2. Find customer's cart
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // 3. Validate payment method
    if (!["COD", "ONLINE"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // 4. Validate products and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product.name}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const itemTotal = product.price * item.quantity;

      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    // 5. Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentMethod,
      paymentStatus:
        paymentMethod === "COD" ? "pending" : "pending",
      orderStatus: "pending",
    });

    // 6. Reduce product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );
    }

    // 7. Clear cart
    cart.items = [];
    await cart.save();

    // 8. Return order
    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("items.product", "name price");

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: populatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
};