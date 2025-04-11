import React, { useState, } from 'react';
import Navbar from '../../Components/Navbar';
import { useLocation } from "react-router-dom";
import './FarmerHome.css';
import Product from './Products';
import Notifications from "./Notifications";
import { FarmerProvider } from "../../Context/FarmerContext";
const FarmerHome = () => {
    const { farmerId } = useFarmer();
    console.log(farmerId)
    // const location = useLocation()
    // const farmerId = location.state.farmerId || null
    return (
        <>
            <Navbar />
        </>
    );
};
export default FarmerHome;
