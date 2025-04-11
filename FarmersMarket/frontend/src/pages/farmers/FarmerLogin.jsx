import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FarmerLogin.css";
import { useFarmer } from "../../Context/FarmerContext";
const FarmerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const otpInputRef = useRef(null);
  const navigate = useNavigate(); // ✅ Correctly declared at top level

  useEffect(() => {
    if (showForgotPassword && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [showForgotPassword]);

  useEffect(() => {
    if (isOtpVerified) {
      setTimeout(() => {
        document.querySelector(".reset-input[type='password']")?.focus();
      }, 100);
    }
  }, [isOtpVerified]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/farmer-login", {
        email,
        password,
      });

      if (res.data.success) {
        console.log("Farmer ID:", res.data.farmerId);
        //setFarmerId(res.data.farmerId);
        navigate("/farmer-home"); // ✅ Navigate on success

      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.log(err)
      setError("Invalid email or password.");
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");
    setEnteredOtp("");

    try {
      const emailCheckRes = await axios.post("http://localhost:5000/api/check-emailfarm", {
        email,
      });

      if (emailCheckRes.data.message !== "Email exists") {
        setError("Email not found. Please check and try again.");
        return;
      }

      const otpRes = await axios.post("http://localhost:5000/api/send-otpfarm", {
        email,
      });

      if (otpRes.data.message === "OTP sent successfully") {
        setShowForgotPassword(true);
        setMessage("OTP sent to your email.");
      } else {
        setError(otpRes.data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("An error occurred while sending OTP.");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/verify-otpfarm", {
        email,
        otp: enteredOtp,
      });

      if (res.data.verified) {
        setIsOtpVerified(true);
        setMessage("OTP verified! You can now reset your password.");
        setError("");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("OTP verification failed.");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/reset-passwordfarm", {
        email,
        newPassword,
      });

      if (res.data.success) {
        setMessage("Password reset successful! You can now login with your new password.");
        setShowForgotPassword(false);
        setIsOtpVerified(false);
        setPassword("");
        setEnteredOtp("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError("Password reset failed.");
      }
    } catch (err) {
      setError("Something went wrong while resetting password.");
    }
  };

  return (
    <div className="app-container">
      <div className="login-page">
        <h1>Farmer Login</h1>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        {showForgotPassword ? (
          <div className="reset-container">
            <h3 className="reset-title">Reset Password</h3>

            {!isOtpVerified ? (
              <>
                <input
                  ref={otpInputRef}
                  type="text"
                  className="reset-input"
                  placeholder="Enter OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  required
                />
                <button className="reset-button" onClick={handleOtpSubmit}>
                  Verify OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type={showPassword ? "text" : "password"}
                  className="reset-input"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="reset-input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="reset-button toggle-button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
                <button className="reset-button" onClick={handleResetPassword}>
                  Reset Password
                </button>
              </>
            )}
          </div>
        ) : (
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <p>
              <button type="button" className="forgot-password" onClick={handleForgotPassword}>
                Forgot Password?
              </button>
            </p>
          </form>
        )}

        <Link to="/" className="back-link">
          Back to Home
        </Link>

        <p className="register-link">
          New user?{" "}
          <Link to="/farmer-register" className="reg-button">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FarmerLogin;
