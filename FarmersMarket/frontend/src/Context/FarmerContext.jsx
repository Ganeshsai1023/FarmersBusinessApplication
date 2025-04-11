// src/context/FarmerContext.js
import React, { createContext, useContext, useState } from "react";
const FarmerContext = createContext();
export const FarmerProvider = ({ children }) => {
    const [farmerId, setFarmerId] = useState(null);

    return (
        <FarmerContext.Provider value={{ farmerId, setFarmerId }}>
            {children}
        </FarmerContext.Provider>
    );
};

export const useFarmer = () => useContext(FarmerContext);
