// src/pages/farmers/FarmerRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { FarmerProvider } from "../../Context/FarmerContext";
import FarmerHome from "./FarmerHome";
import Products from "./Products";
import AddProduct from "./AddProduct";
import Notifications from "./Notifications";
import Profile from "./Profile";

const FarmerRoutes = () => {
    return (
        <FarmerProvider>
            <Routes>
                <Route path="/farmer-home" element={<FarmerHome />} />
                <Route path="/products" element={<Products />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </FarmerProvider>
    );
};

export default FarmerRoutes;
