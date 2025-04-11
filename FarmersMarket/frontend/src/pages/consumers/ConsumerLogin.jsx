import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ConsumerLogin.css";

const ConsumerLogin = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpExpired, setOtpExpired] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0 && !isOtpVerified) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && showForgotPassword && !isOtpVerified) {
      setOtpExpired(true);
    }
    return () => clearInterval(interval);
  }, [timer, showForgotPassword, isOtpVerified]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/consumer-login", {
        email,
        password,
      });

      if (res.data.success) {
        alert("Login successful!");
        // Redirect or store token if needed
      } else {
        alert(res.data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email to receive an OTP.");
      return;
    }

    try {
      const emailCheckRes = await axios.post("http://localhost:5000/api/check-emailCons", { email });
      if (emailCheckRes.data.message !== "Email exists") {
        alert("Email not registered.");
        return;
      }

      const otpRes = await axios.post("http://localhost:5000/api/send-otpCons", { email });
      console.log(otpRes);
      if (otpRes.data.message == "OTP sent successfully") {
        alert(`OTP sent to ${email}`);
        setShowForgotPassword(true);
        setOtpExpired(false);
        setTimer(120);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("Error checking email or sending OTP.");
    }
  };

  const handleOtpSubmit = async () => {
    if (otpExpired) {
      alert("OTP has expired. Please request a new one.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/verify-otpCons", {
        email,
        otp: enteredOtp,
      });
      console.log(res)
      if (res.data.message == "OTP verified successfully") {
        alert("OTP verified! You can now reset your password.");
        setIsOtpVerified(true);
        setTimer(0);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error verifying OTP.");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/reset-passwordCons", {
        email,
        newPassword,
      });

      if (res.data.success) {
        alert("Password reset successful! You can now login.");
        setShowForgotPassword(false);
        setIsOtpVerified(false);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert("Failed to reset password.");
      }
    } catch (error) {
      console.error(error);
      alert("Error resetting password.");
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="app-container">
      <div className="login-page">
        <h1>Consumer Login</h1>

        {!showForgotPassword ? (
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
            <p className="forgot-password">
              <button type="button" onClick={handleForgotPassword}>
                Forgot Password?
              </button>
            </p>
          </form>
        ) : (
          <div className="reset-container">
            <h3 className="reset-title">Reset Password</h3>
            {!isOtpVerified ? (
              <>
                <input
                  type="text"
                  className="reset-input"
                  placeholder="Enter OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  required
                  disabled={otpExpired}
                />
                {otpExpired ? (
                  <p className="error-text">OTP expired. Please request a new one.</p>
                ) : (
                  <p className="timer-text">OTP valid for: {formatTime(timer)}</p>
                )}
                <button
                  className="reset-button"
                  onClick={handleOtpSubmit}
                  disabled={otpExpired}
                >
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
        )}

        <Link to="/" className="back-link">
          Back to Home
        </Link>

        <p className="register-link">
          New user?{" "}
          <Link to="/consumer-register" className="reg-button">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ConsumerLogin;
