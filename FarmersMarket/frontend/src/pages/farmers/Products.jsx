import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Product.module.css";
import Navbar from "../../Components/Navbar";
import AddProduct from "./AddProduct"; // Ensure this path is correct

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");

  const farmerId = localStorage.getItem("farmerId");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("Farmer ID:", farmerId); // Debugging: Check the farmerId
      const response = await axios.post("http://localhost:5000/api/products", { farmerId }); // Sending farmerId in the body
      console.log("Fetched products:", response.data); // Debugging: Check fetched products
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };


  const handleSaveProduct = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts(); // Refresh the product list after adding or editing a product
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts(); // Refresh the product list after deleting a product
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  return (
    <div className={styles.productsContainer}>
      <Navbar />
      <h2>Product List</h2>

      {error && <p className={styles.error}>{error}</p>}

      <button
        className={styles.addProductBtn}
        onClick={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
      >
        Add Product
      </button>

      {showForm && (
        <AddProduct
          farmerId={farmerId}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          product={editingProduct}
        />
      )}

      {products.length === 0 ? (
        <p className={styles.noProducts}>No products found.</p>
      ) : (
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div className={styles.productCard} key={product._id}>
              <img
                src={product.image || "/assets/default.jpg"}
                alt={product.name}
                className={styles.productImage}
              />
              <h3>{product.name}</h3>
              <p className={styles.price}>
                Price: <span>₹{product.price}</span>
              </p>
              <p className={styles.stockStatus}>{product.stock}</p>
              <div className={styles.productActions}>
                <button className={styles.editBtn} onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
