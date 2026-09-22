import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { username, email, password } = inputValue;

  useEffect(() => {
    const stored = localStorage.getItem("tradeza_user");
    if (stored) {
      try {
        setCurrentUser(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "password") {
      setPasswordError(
        value.length > 0 && value.length < 6
          ? "Enter Valid Password of length 6"
          : "",
      );
    }

    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || password.length < 6) {
      setErrorMsg("Please fill in all fields Correctly");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const signedUpUser = data.user || {
          username: username,
          email: email,
        };
        localStorage.setItem("tradeza_user", JSON.stringify(signedUpUser));
        window.dispatchEvent(new Event("storage"));
        setCurrentUser(signedUpUser);
        setSuccessMsg(data.message || "Account created successfully!");
      } else {
        setErrorMsg(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "Unable to connect to the server. Please ensure the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("tradeza_user");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setCurrentUser(null);
    setSuccessMsg("");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="container auth-page-container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="auth-card p-4 p-md-5 shadow-sm rounded">
            {currentUser ? (
              <div className="text-center">
                <div className="auth-success-icon mb-3">
                  <span className="badge bg-success-subtle text-success p-3 rounded-circle fs-2">
                    ✓
                  </span>
                </div>
                <h3 className="mb-2">Welcome, {currentUser.username}!</h3>
                <p className="text-muted mb-4">
                  You are currently logged in with{" "}
                  <strong>{currentUser.email || currentUser.username}</strong>.
                </p>

                {successMsg && (
                  <div className="alert alert-success py-2 mb-4" role="alert">
                    {successMsg}
                  </div>
                )}

                <div className="d-grid gap-3">
                  <a
                    href="http://localhost:3001" //here the hardcoaded  api is present
                    className="btn btn-primary btn-lg fw-semibold"
                  >
                    Go to Dashboard &rarr;
                  </a>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-secondary"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-1">Open Tradeza Account</h2>
                  <p className="text-muted">
                    Sign up now to start investing & trading
                  </p>
                </div>

                {errorMsg && (
                  <div className="alert alert-danger py-2" role="alert">
                    {errorMsg}
                  </div>
                )}

                {successMsg && (
                  <div className="alert alert-success py-2" role="alert">
                    {successMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      className="form-label fw-semibold"
                      htmlFor="username"
                    >
                      Full Name / Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      onChange={handleOnChange}
                      placeholder="e.g. Rohan Cherkar"
                      className="form-control form-control-lg"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold" htmlFor="email">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                      placeholder="e.g. rohan@tradeza.com"
                      className="form-control form-control-lg"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="form-label fw-semibold"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      placeholder="Create a strong password"
                      className="form-control form-control-lg"
                      aria-invalid={!!passwordError}
                      aria-describedby="password-error"
                    />
                    {passwordError && (
                      <small id="password-error" className="auth-error">
                        {passwordError}
                      </small>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-100 py-2 fs-5 fw-semibold"
                  >
                    {loading ? "Creating account..." : "Sign Up"}
                  </button>
                </form>

                <div className="text-center mt-4 pt-2 border-top">
                  <p className="text-muted mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="fw-semibold text-primary">
                      Log in
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
