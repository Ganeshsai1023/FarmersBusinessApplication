import React, { useState, } from 'react';
import Navbar from '../../Components/Navbar';
import { useLocation } from "react-router-dom";
import './FarmerHome.css';
import Product from './Products';
import Notifications from "./Notifications";
const FarmerHome = () => {
    return (
        <>
            <Navbar />
        </>
    );
};
export default FarmerHome;
