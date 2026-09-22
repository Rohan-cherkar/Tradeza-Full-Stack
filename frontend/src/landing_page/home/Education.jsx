import React from "react";

function Education() {
  return (
    <>
      <div className="container mt-5 mb-5 ">
        <div className="row ">
          <div className="col-6">
            <img
              src="media\images\education.svg"
              alt=""
              className="education-img"
            />
          </div>
          <div className="col-6">
            <h3 className="mb-4 mt-5">Free and open market education</h3>
            <p className="fs-6">
              Varsity, the largest online stock market education book in the
              world covering everything from the basics to advanced trading.
            </p>
            <a className="me-5 fs-6" href="/">
              Varsity
              <i class="fa-solid fa-arrow-right-long"></i>
            </a>
            <p className="mt-5 mb-4 fs-6">
              TradingQ&A, the most active trading and investment community in
              India for all your market related queries.
            </p>
            <a className="me-5 fs-6  " href="/">
              TradingQ&A
              <i class="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Education;
