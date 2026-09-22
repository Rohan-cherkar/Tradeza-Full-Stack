import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    if (name === "password") {
      setPasswordError(
        value.length > 0 && value.length < 6
          ? "Password length must be grater than 6"
          : "",
      );
    }
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "top-center",
      autoClose: 3000,
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 1500,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || password.length < 6 || !username) {
      handleError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true },
      );
      const { success, message, user } = data;
      if (success) {
        handleSuccess(message || "Signup successful!");
        const signedUpUser = user || {
          username: username,
          email: email,
        };
        localStorage.setItem("tradeza_user", JSON.stringify(signedUpUser));
        window.dispatchEvent(new Event("storage"));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      handleError(
        error.response?.data?.message ||
          "Failed to create account. Please check server.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-logo-section">
          <img src="/logo.png" alt="Tradeza Logo" className="auth-logo" />
          <h2 className="auth-title">Create Tradeza Account</h2>
          <p className="auth-subtitle">Join thousands of traders today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="username">Full Name / Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder="e.g. Rohan Cherkar"
              onChange={handleOnChange}
              required
              autoFocus
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="e.g. yourname@domain.com"
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Choose a strong password"
              onChange={handleOnChange}
              aria-invalid={!!passwordError}
              aria-describedby="password-error"
            />
            {passwordError && (
              <small id="password-error" className="auth-error">
                {passwordError}
              </small>
            )}
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Creating account..." : "Continue"}
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-footer-link">
            <span>Already have an account?</span>{" "}
            <Link to="/login" className="auth-highlight-link">
              Log in
            </Link>
          </div>
        </form>
      </div>

      <div className="auth-page-footer">
        <p>Zerodha Kite inspired trading interface • Tradeza</p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
