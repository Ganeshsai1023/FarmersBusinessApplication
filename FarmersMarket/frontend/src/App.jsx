import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router components
import ConsumerLogin from "./pages/consumers/ConsumerLogin.jsx"; // Consumer login page
import ConsumerReg from "./pages/consumers/ConsumerReg.jsx"; // Consumer registration page
import FarmerLogin from "./pages/farmers/FarmerLogin.jsx";   // Farmer login page
import FarmerReg from "./pages/farmers/FarmerReg.jsx";   // Farmer registration page
import AdminLogin from "./pages/admin/AdminLogin.jsx";   // Admin login page
import Home from "./pages/Home.jsx"; // Home page
// import FarmerHome from "./pages/farmers/FarmerHome.jsx";
// import Products from "./pages/farmers/Products.jsx";
// import AddProduct from "./pages/farmers/AddProduct.jsx";
// import Notifications from "./pages/farmers/Notifications"; // Updated path
// import Profile from "./pages/farmers/Profile.jsx";
import FarmerRoutes from "./pages/farmers/farmerRoutes.jsx";
import Unauthorized from "./pages/admin/Unauthorized.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define Routes for each page */}
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<FarmerRoutes />} /> {/* ✅ Farmer Protected Routes */}
        <Route path="/consumer-login" element={<ConsumerLogin />} />
        <Route path="/consumer-register" element={<ConsumerReg />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/farmer-register" element={<FarmerReg />} />
        {/* <Route path="/farmer-home" element={<FarmerHome />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} /> */}
        {/* <Route path="/notifications" element={<Notifications />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/admin/:id" element={<AdminLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;

