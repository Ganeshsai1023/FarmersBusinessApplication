import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AddProduct from "./AddProduct";
import Navbar from "../../Components/Navbar"; // Import Navbar
import styles from "./Product.module.css";

const initialProducts = [
  { id: 1, name: "Tomatoes", price: 200, stock: "In Stock", image: "/assets/tomatoes.jpeg" },
  { id: 2, name: "Potatoes", price: 100, stock: "In Stock", image: "/assets/potatoes.jpg" },
  { id: 3, name: "Spinach", price: 8, stock: "In Stock", image: "/assets/spinach.jpg" },
  { id: 4, name: "Bell Peppers", price: 50, stock: "50 in stock", image: "/assets/peppers.jpg" },
  { id: 5, name: "Carrots", price: 30, stock: "30 in stock", image: "/assets/carrots.jpg" }
];

const Product = () => {
  const location = useLocation();
  const farmerId = location.state || {};
  //console.log(farmerId, "Products page")
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleSaveProduct = (newProduct) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(product =>
        product.id === editingProduct.id
          ? { ...newProduct, id: editingProduct.id, stock: `${newProduct.quantity} in stock` }
          : product
      ));
    } else {
      // Add new product
      const productWithId = {
        ...newProduct,
        id: products.length + 1,
        stock: `${newProduct.quantity} in stock`
      };
      setProducts([...products, productWithId]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className={styles.productsContainer}>
      <Navbar />

      <button
        className={styles.addProductBtn}
        onClick={() => {
          setShowForm(true);
          setEditingProduct(null);
        }}
      >
        Add Product
      </button>

      {showForm && (
        <AddProduct
          farmerId={farmerId}
          onAddProduct={handleSaveProduct}
          onClose={() => setShowForm(false)}
          product={editingProduct}
        />
      )}

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div className={styles.productCard} key={product.id}>
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
              <button className={styles.editBtn} onClick={() => handleEdit(product)}>Edit</button>
              <button className={styles.deleteBtn} onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
