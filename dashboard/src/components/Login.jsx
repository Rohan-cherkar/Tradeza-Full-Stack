import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
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
    if (!email || !password) {
      handleError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message, user } = data;
      if (success) {
        handleSuccess(message || "Login successful!");
        const loggedInUser = user || {
          username: email.split("@")[0],
          email: email,
        };
        localStorage.setItem("tradeza_user", JSON.stringify(loggedInUser));
        window.dispatchEvent(new Event("storage"));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      handleError(
        error.response?.data?.message || "Failed to login. Please check server."
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
          <h2 className="auth-title">Login to Tradeza</h2>
          <p className="auth-subtitle">Online trading and investment platform</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="email">Email / User ID</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="e.g. yourname@domain.com"
              onChange={handleOnChange}
              required
              autoFocus
            />
          </div>

          <div className="auth-form-group">
            <div className="auth-label-row">
              <label htmlFor="password">Password</label>
              <a
                href="#forgot"
                className="auth-link-subtle"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info(
                    "Password reset link will be sent to your email",
                    { position: "top-center" }
                  );
                }}
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-footer-link">
            <span>Don't have an account?</span>{" "}
            <Link to="/signup" className="auth-highlight-link">
              Sign up now
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

export default Login;
