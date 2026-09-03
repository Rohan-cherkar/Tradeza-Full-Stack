import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav
      class="navbar navbar-expand-lg bg-body-tertiary position-fixed "
      style={{ width: "100%" }}
    >
      <div class="container-fluid row">
        <div className="col-6 ms-5 ps-3">
          <Link class="navbar-brand" to="/">
            <img src="/media/images/logo.svg" alt="" style={{ width: "22%" }} />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <div class="collapse navbar-collapse col-6 ms-2" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item ">
              <Link to="/signup" class="nav-link" aria-current="page" href="#">
                Signup
              </Link>
            </li>
            <li class="nav-item ">
              <Link to="/about" class="nav-link" href="#">
                About
              </Link>
            </li>
            <li class="nav-item ">
              <Link to="/product" class="nav-link" href="#">
                Products
              </Link>
            </li>
            <li class="nav-item ">
              <Link to="/pricing" class="nav-link" href="#">
                Pricing
              </Link>
            </li>
            <li class="nav-item ">
              <Link to="/support" class="nav-link" href="#">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
