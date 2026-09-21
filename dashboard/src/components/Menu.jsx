import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Load user from localStorage and verify session with backend
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("tradeza_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing stored user", e);
        }
      }
    };

    loadUser();

    // Verify session with backend
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3000",
          {},
          { withCredentials: true },
        );
        if (data.status && data.user) {
          const updatedUser = {
            username: data.user,
            email: data.email || (user ? user.email : ""),
          };
          setUser(updatedUser);
          localStorage.setItem("tradeza_user", JSON.stringify(updatedUser));
        }
      } catch (err) {
        // Dev server or unauthenticated
        console.log("Auth verify:", err.message);
      }
    };

    verifyUser();

    const handleStorageChange = () => {
      loadUser();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsProfileDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    try {
      if (typeof removeCookie === "function") {
        removeCookie("token", { path: "/" });
      }
    } catch (e) {
      console.log("Error removing cookie:", e);
    }
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("tradeza_user");
    setUser(null);
    setIsProfileDropdownOpen(false);
    toast.info("Logged out successfully", {
      position: "top-center",
      autoClose: 2000,
    });
    navigate("/login");
  };

  // Helper to get initials
  const getInitials = (name) => {
    if (!name) return "ZU";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="Logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />

        <div className="profile-wrapper" ref={dropdownRef}>
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">{getInitials(user?.username)}</div>
            <p className="username">{user ? user.username : "Sign In"}</p>
          </div>

          {/* Zerodha Kite Style Profile Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className="profile-dropdown-menu">
              {user ? (
                <>
                  <div className="dropdown-user-header">
                    <div className="dropdown-avatar">
                      {getInitials(user.username)}
                    </div>
                    <div className="dropdown-user-info">
                      <h4>{user.username}</h4>
                      <p>{user.email || "Active Trader"}</p>
                    </div>
                  </div>

                  <div className="dropdown-divider" />

                  <ul className="dropdown-links">
                    <li>
                      <Link
                        to="/"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <i className="fa fa-user-circle"></i> My Profile /
                        Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/funds"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <i className="fa fa-wallet"></i> Funds & Statements
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <i className="fa fa-history"></i> Order History
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#support"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsProfileDropdownOpen(false);
                          toast.info("Tradeza Support Portal 24x7");
                        }}
                      >
                        <i className="fa fa-life-ring"></i> Support & Help
                      </a>
                    </li>
                  </ul>

                  <div className="dropdown-divider" />

                  <div className="dropdown-footer">
                    <button
                      className="dropdown-logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="dropdown-guest-box">
                  <div className="dropdown-guest-header">
                    <h4>Welcome to Tradeza</h4>
                    <p>Login to view your portfolio & trade</p>
                  </div>
                  <div className="dropdown-auth-actions">
                    <Link
                      to="/login"
                      className="dropdown-btn-primary"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="dropdown-btn-secondary"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
