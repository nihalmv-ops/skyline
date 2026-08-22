const Product = require("../models/Product");

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sort = "newest",
    } = req.query;

    // Only show active products to customers
    const filter = {
      isActive: true,
    };

    // Search by product name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by price range
    if (
      minPrice !== undefined ||
      maxPrice !== undefined
    ) {
      filter.price = {};

      if (minPrice !== undefined) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice !== undefined) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // Pagination
    const pageNumber = Math.max(Number(page), 1);

    const limitNumber = Math.min(
      Math.max(Number(limit), 1),
      50
    );

    const skip =
      (pageNumber - 1) * limitNumber;

    // Sorting
    let sortOption = {
      createdAt: -1,
    };

    if (sort === "price-low") {
      sortOption = {
        price: 1,
      };
    }

    if (sort === "price-high") {
      sortOption = {
        price: -1,
      };
    }

    if (sort === "name") {
      sortOption = {
        name: 1,
      };
    }

    // Total products
    const totalProducts =
      await Product.countDocuments(filter);

    // Get products
    const products = await Product.find(filter)
      .populate("category", "name")
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    res.status(200).json({
      success: true,

      pagination: {
        page: pageNumber,
        limit: limitNumber,
        totalProducts,
        totalPages: Math.ceil(
          totalProducts / limitNumber
        ),
      },

      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    }).populate("category", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// @desc    Create product
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      image,
      brand,
    } = req.body;

    // Required fields
    if (
      !name ||
      !description ||
      price === undefined ||
      !category ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide name, description, price, category and stock",
      });
    }

    // Validate price
    if (Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }

    // Validate stock
    if (Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image,
      brand,
    });

    const populatedProduct =
      await Product.findById(product._id).populate(
        "category",
        "name"
      );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: populatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      image,
      brand,
      isActive,
    } = req.body;

    // Validate price
    if (
      price !== undefined &&
      Number(price) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }

    // Validate stock
    if (
      stock !== undefined &&
      Number(stock) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          description,
          price,
          category,
          stock,
          image,
          brand,
          isActive,
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate("category", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    // Soft delete
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          isActive: false,
        },
        {
          new: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deactivated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to deactivate product",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};