import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FarmerReg.css";

const FarmerReg = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        aadharNo: "",
    });

    const [error, setError] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [showOtpField, setShowOtpField] = useState(false);
    const [otp, setOtp] = useState("");
    const [serverOtp, setServerOtp] = useState("");
    const [serverMessage, setServerMessage] = useState("");

    const [otpTimer, setOtpTimer] = useState(120);
    const [timerInterval, setTimerInterval] = useState(null);

    const startOtpTimer = () => {
        const interval = setInterval(() => {
            setOtpTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        setTimerInterval(interval);
    };

    const resetOtpTimer = () => {
        clearInterval(timerInterval);
        setOtpTimer(120);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRequestOtp = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setError("");
        try {
            const res = await axios.post("http://localhost:5000/api/request-otp", {
                email: formData.email
            });

            setServerOtp(res.data.otp);
            setShowOtpField(true);
            startOtpTimer();
            setServerMessage("OTP sent to your email. Please enter it below.");
        } catch (err) {
            console.error("OTP Request Error:", err);
            setError(err.response?.data?.message || "Failed to request OTP");
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        if (otpTimer === 0) {
            setError("OTP expired. Please request a new one.");
            return;
        }

        if (otp !== serverOtp) {
            setError("Invalid OTP.");
            return;
        }

        setError("");
        setServerMessage("OTP verified! Registering farmer...");
        resetOtpTimer();
        registerFarmer();
    };

    const registerFarmer = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/addfarmer", formData);
            console.log("Farmer Registration:", res.data);
            setIsRegistered(true);
            setShowOtpField(false);
            setServerMessage("Registration successful!");
        } catch (err) {
            console.error("Registration Error:", err);
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    useEffect(() => {
        return () => clearInterval(timerInterval);
    }, [timerInterval]);

    return (
        <div className="register-container">
            <h1>Farmer Registration</h1>

            {!showOtpField && !isRegistered && (
                <form onSubmit={handleRequestOtp}>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
                    <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} placeholder="Aadhar Number" required />

                    {error && <p className="error-message">{error}</p>}
                    {serverMessage && <p className="success-message">{serverMessage}</p>}

                    <button type="submit">Request OTP</button>
                </form>
            )}

            {showOtpField && !isRegistered && (
                <form onSubmit={handleOtpSubmit}>
                    <h3>OTP sent to {formData.email}</h3>
                    <p>Expires in: {otpTimer} seconds</p>
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required disabled={otpTimer === 0} />
                    <button type="submit" disabled={otpTimer === 0}>Verify OTP & Register</button>
                </form>
            )}

            {isRegistered && (
                <div>
                    <p>Registration successful! Click below to login.</p>
                    <Link to="/farmer-login" className="login-button">Login here</Link>
                </div>
            )}
        </div>
    );
};

export default FarmerReg;
