import React from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <div className="home-containerr">
      <h1>Welcome to FBA</h1>
      <p className="subtitlee">Connecting Farmers and Consumers Directly</p>
      <div className="button-groupp">
        {/* Consumer Login Button */}
        <Link to="/consumer-login">
          <button className="role-buttonn">Consumer </button>
        </Link>

        {/* Farmer Login Button */}
        <Link to="/farmer-login">
          <button className="role-buttonn">Farmer </button>
        </Link>

        {/* Admin Login Button */}
        <Link to="/admin-login/">
        </Link>
      </div>
    </div>
  );
};

export default Home;