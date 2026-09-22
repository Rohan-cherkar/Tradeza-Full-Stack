import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("tradeza_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    const handleStorage = () => {
      loadUser();
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tradeza_user");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100 shadow-sm">
      <div className="container-fluid px-4 px-lg-5">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/media/images/logo.svg"
            alt="Tradeza Logo"
            style={{ width: "130px", height: "auto" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#tradezaNavbar"
          aria-controls="tradezaNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="tradezaNavbar">
          <ul className="navbar-nav ms-auto align-items-center mb-2 mb-lg-0">
            {/* Buy Stocks Action Button */}
            <li className="nav-item my-1 my-lg-0 me-lg-2">
              <a
                href="http://localhost:3001"
                className="btn btn-outline-primary btn-sm px-3 py-1 fw-bold d-flex align-items-center gap-1 buy-stocks-btn"
                title="Open Trading Dashboard to Buy/Sell Stocks"
              >
                <span>⚡</span>
                <span>Buy Stocks</span>
              </a>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link text-secondary">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/product" className="nav-link text-secondary">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pricing" className="nav-link text-secondary">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/support" className="nav-link text-secondary">
                Support
              </Link>
            </li>

            {/* Auth Conditional Section */}
            {user ? (
              <>
                <li className="nav-item my-1 my-lg-0 ms-lg-2">
                  <a
                    href="http://localhost:3001"
                    className="btn btn-primary btn-sm px-3 py-1 fw-semibold dashboard-nav-btn"
                  >
                    Dashboard &rarr;
                  </a>
                </li>
                <li className="nav-item dropdown ms-lg-2">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                      style={{ width: "32px", height: "32px", fontSize: "14px" }}
                      title={user.email || user.username}
                    >
                      {getInitials(user.username)}
                    </div>
                    <span
                      className="d-none d-xl-inline text-truncate text-dark fw-medium"
                      style={{ maxWidth: "110px" }}
                    >
                      {user.username}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="btn btn-link text-muted p-0 text-decoration-none ms-1"
                      style={{ fontSize: "13px" }}
                      title="Log out"
                    >
                      Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ms-lg-2">
                  <Link to="/login" className="nav-link fw-medium text-dark">
                    Login
                  </Link>
                </li>
                <li className="nav-item ms-lg-1">
                  <Link
                    to="/signup"
                    className="btn btn-primary btn-sm px-3 py-1 fw-medium"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
