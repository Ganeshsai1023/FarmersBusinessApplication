const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    default: () => uuidv4(), // Generates a unique ID for each product
    unique: true,
  },
  name: String,
  category: String,
  description: String,
  price: Number,
  quantity: Number,
  contact: String,
  image: String,
  farmerId: {
    type: String, // Stored as String as requested
    required: true,
  },
});

module.exports = mongoose.model("products", productSchema); // Using "products" as schema name
