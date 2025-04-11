import React, { useState, useRef, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

const AdminLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const otpInputRef = useRef(null);

  const allowedAdmins = ["ganesh", "nikitha", "lavanya", "rajeswari"];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  if (!allowedAdmins.includes(id)) {
    return <Navigate to="/unauthorized" />;
  }

  useEffect(() => {
    if (showForgotPassword && timer > 0) {
      timerRef.current = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    } else {
      clearTimeout(timerRef.current);
    }
    return () => clearTimeout(timerRef.current);
  }, [timer, showForgotPassword]);

  useEffect(() => {
    if (showForgotPassword && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [showForgotPassword]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/admin-login", {
        username,
        password,
      });

      if (response.data.success) {
        navigate("/admin-dashboard");
      } else {
        setErrorMsg(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    setErrorMsg("");
    setMessage("");
    setEnteredOtp("");
    setIsOtpVerified(false);

    try {
      const checkUser = await axios.post("http://localhost:5000/api/check-usernameadmin", {
        username,
      });

      if (checkUser.data.message !== "Admin exists") {
        setErrorMsg("Admin not found.");
        return;
      }

      const sendOtp = await axios.post("http://localhost:5000/api/send-otpadmin", {
        username,
      });

      if (sendOtp.data.message === "OTP sent successfully") {
        setShowForgotPassword(true);
        setShowOtpField(true);
        setMessage("OTP sent to your registered email.");
        setTimer(120); // 2 minutes
      } else {
        setErrorMsg("Failed to send OTP.");
      }
    } catch (err) {
      setErrorMsg("Error occurred while sending OTP.");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/verify-otpadmin", {
        username,
        otp: enteredOtp,
      });

      if (res.data.verified) {
        setIsOtpVerified(true);
        setMessage("OTP verified. You can now reset your password.");
        setErrorMsg("");
      } else {
        setErrorMsg("Invalid OTP.");
      }
    } catch (err) {
      setErrorMsg("Error verifying OTP.");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/reset-passwordadmin", {
        username,
        newPassword,
      });

      if (res.data.success) {
        setMessage("Password reset successful!");
        setShowForgotPassword(false);
        setShowOtpField(false);
        setIsOtpVerified(false);
        setEnteredOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setPassword("");
      } else {
        setErrorMsg("Password reset failed.");
      }
    } catch (err) {
      setErrorMsg("Error resetting password.");
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        {!showOtpField && (
          <>
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
        )}

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}

        {!showForgotPassword && !showOtpField && (
          <>
            <button type="submit" className="login-button">
              LOGIN
            </button>
            <button type="button" onClick={handleForgotPassword} className="forgot-password-button">
              Forgot Password?
            </button>
            <p className="new-user">New User? Contact the system administrator.</p>
          </>
        )}

        {showForgotPassword && (
          <div className="otp-reset-box">
            {!isOtpVerified ? (
              timer > 0 ? (
                <>
                  <input
                    ref={otpInputRef}
                    type="text"
                    placeholder="Enter OTP"
                    className="input-field"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    required
                  />
                  <button type="button" className="login-button" onClick={handleOtpSubmit}>
                    Verify OTP
                  </button>
                  <p className="timer-text">OTP valid for: {formatTime(timer)}</p>
                </>
              ) : (
                <>
                  <p className="timer-text" style={{ color: "red", fontWeight: "bold" }}>
                    OTP expired. Please retry.
                  </p>
                  <button
                    type="button"
                    className="login-button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setShowOtpField(false);
                      setIsOtpVerified(false);
                      setEnteredOtp("");
                      setMessage("");
                      setErrorMsg("");
                      setTimer(0);
                    }}
                  >
                    Back to Login
                  </button>
                </>
              )
            ) : (
              <>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="input-field"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="input-field"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
                <button type="button" className="login-button" onClick={handleResetPassword}>
                  Reset Password
                </button>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminLogin;
