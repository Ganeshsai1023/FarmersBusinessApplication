const Product = require("../../Models/Products"); // adjust path if needed

// Add Product Controller
const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      quantity,
      contact,
      image,
      farmerId,
    } = req.body;

    // Basic validation
    if (!name || !category || !price || !quantity || !contact || !farmerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      name,
      category,
      description,
      price,
      quantity,
      contact,
      image,
      farmerId,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = addProduct;
