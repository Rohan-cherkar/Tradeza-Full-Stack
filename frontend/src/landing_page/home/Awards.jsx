import React from "react";
function Awards() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-lg-6 p-5">
          <img src="media/images/largestBroker.svg" />
        </div>
        <div className="col-lg-6 mt-4 p-5">
          <h2 className="mb-3">Largest stock Broker in India</h2>
          <p>
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <br />
          <div className="row">
            <div className="col-6">
              <ul>
                <li>Future and Options</li>
                <li>Commodity derivatives</li>
                <li>currency derivatives</li>
              </ul>
            </div>
            <div className="col-6 mb-3">
              <ul>
                <li>Stocks and IPO</li>
                <li>Direct Mutual funds</li>
                <li>Bonds and Government</li>
              </ul>
            </div>
            <img
              src="media\images\pressLogos.png"
              style={{ width: "75%" }}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
