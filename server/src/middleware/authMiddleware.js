const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ===============================
// PROTECT MIDDLEWARE
// ===============================
const protect = async (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token required.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find user from decoded JWT
    const user = await User.findById(decoded.id).select("-password");

    // User doesn't exist
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};


// ===============================
// ADMIN ONLY MIDDLEWARE
// ===============================
const adminOnly = (req, res, next) => {

  // protect middleware should run first
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authorized.",
    });
  }

  // Check user role
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required.",
    });
  }

  next();
};


// ===============================
// EXPORT
// ===============================
module.exports = {
  protect,
  adminOnly,
};