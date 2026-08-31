import React from "react";
function Pricing() {
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-4 mb-3">
          <h2 className="mb-3">Unbeatable pricing</h2>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a className="me-5" href="/">
            See Pricing
            <i class="fa-solid fa-arrow-right-long"></i>
          </a>
        </div>
        <div className="col-2"></div>
        <div className="col-6">
          <div className="row">
            <div className="col">
              <h1>0</h1>
              <p>Free account opening</p>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
