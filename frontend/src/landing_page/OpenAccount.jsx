import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col text-center mt-5">
            <h2>Open a Tradeza account</h2>
            <p className="mt-3 ">
              Modern platforms and apps, ₹0 investments, and flat ₹20 intraday
              and F&O trades.
            </p>
            <Link to="/signup" className="btn btn-primary mt-4 px-4 py-2 fw-semibold">
              Signup for Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpenAccount;