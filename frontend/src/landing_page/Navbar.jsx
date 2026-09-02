import React from "react";
function Navbar() {
  return (
    <nav
      class="navbar navbar-expand-lg bg-body-tertiary position-fixed "
      style={{ width: "100%" }}
    >
      <div class="container-fluid row">
        <div className="col-6 ms-5 ps-3">
          <a class="navbar-brand" href="#">
            <img src="/media/images/logo.svg" alt="" style={{ width: "22%" }} />
          </a>
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
              <a class="nav-link" aria-current="page" href="#">
                Signup
              </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="#">
                About
              </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="#">
                Products
              </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="#">
                Support
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
