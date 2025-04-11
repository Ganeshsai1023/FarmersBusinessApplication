// import React, { useState, useEffect } from "react";
// import "./AddProduct.css";

// const AddProduct = ({ onAddProduct, onClose }) => {
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     category: "",
//     description: "",
//     price: "",
//     quantity: "",
//     contact: "",
//     image: "",
//   });

//   const [imagePreview, setImagePreview] = useState(null);

//   const handleInputChange = (e) => {
//     setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setNewProduct({ ...newProduct, image: imageUrl });
//       setImagePreview(imageUrl);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       // Clean up URL.createObjectURL to avoid memory leaks
//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     };
//   }, [imagePreview]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, price, quantity, contact, category, description } = newProduct;
//     if (!name || !price || !quantity || !contact || !category || !description) {
//       alert("Please fill all required fields!");
//       return;
//     }
//     onAddProduct(newProduct);
//   };

//   return (
//     <div className="form-overlay">
//       <div className="add-product-form">
//         <h2>Add New Product</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Product Name */}
//           <div className="form-group">
//             <label>Product Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="e.g., Carrots"
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Category */}
//           <div className="form-group">
//             <label>Category</label>
//             <select name="category" onChange={handleInputChange} required>
//               <option value="">-- Select Category --</option>
//               <option value="Vegetables">Vegetables</option>
//               <option value="Fruits">Fruits</option>
//               <option value="Grains">Grains</option>
//             </select>
//           </div>

//           {/* Description */}
//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               name="description"
//               placeholder="Describe your product..."
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Image Upload */}
//           <div className="form-group">
//             <label>Upload Product Image</label>
//             <input type="file" accept="image/*" onChange={handleImageUpload} />
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="preview-image"
//               />
//             )}
//           </div>

//           {/* Price & Quantity */}
//           <div className="form-row">
//             <div className="form-group">
//               <label>Price per Unit (₹)</label>
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="e.g., 50"
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Quantity Available</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 placeholder="e.g., 100 kg"
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           </div>

//           {/* Contact */}
//           <div className="form-group">
//             <label>Contact Info</label>
//             <input
//               type="text"
//               name="contact"
//               placeholder="Mobile / Email"
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Submit & Cancel */}
//           <div className="form-actions">
//             <button type="submit" className="submit-btn">
//               Submit
//             </button>
//             <button type="button" className="cancel-btn" onClick={onClose}>
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useState, useEffect } from "react";
import "./AddProduct.css";

const AddProduct = ({ onAddProduct, onClose, product, farmerId }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    contact: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Pre-fill form fields when editing a product
  useEffect(() => {
    if (product) {
      setNewProduct({
        name: product.name || "",
        category: product.category || "",
        description: product.description || "",
        price: product.price || "",
        quantity: product.stock ? parseInt(product.stock.split(" ")[0]) : "",
        contact: product.contact || "",
        image: product.image || "",
      });
      setImagePreview(product.image || null);
    } else {
      // Reset fields when adding a new product
      setNewProduct({
        name: "",
        category: "",
        description: "",
        price: "",
        quantity: "",
        contact: "",
        image: "",
      });
      setImagePreview(null);
    }
  }, [product]);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, image: imageUrl });
      setImagePreview(imageUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, quantity, contact, category, description } = newProduct;
    if (!name || !price || !quantity || !contact || !category || !description) {
      alert("Please fill all required fields!");
      return;
    }
    onAddProduct(newProduct);
  };

  return (
    <div className="form-overlay">
      <div className="add-product-form">
        <h2>{product ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              placeholder="e.g., Carrots"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={newProduct.category} onChange={handleInputChange} required>
              <option value="">-- Select Category --</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              placeholder="Describe your product..."
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="preview-image" />}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price per Unit (₹)</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                placeholder="e.g., 50"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Quantity Available</label>
              <input
                type="number"
                name="quantity"
                value={newProduct.quantity}
                placeholder="e.g., 100 kg"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Contact Info</label>
            <input
              type="text"
              name="contact"
              value={newProduct.contact}
              placeholder="Mobile / Email"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">{product ? "Update" : "Submit"}</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
