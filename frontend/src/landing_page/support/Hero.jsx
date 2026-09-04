import React from "react";
function Hero() {
  return (
    <div className="container-fulid support-container ">
      <div className="row">
        <div className="col-4">
          <h1 className="ms-4">Support Portal</h1>
        </div>
        <div className="col-6"></div>
        <div className="col-2 pt-2 ps-5">
          <button className="btn btn-primary">My Ticket</button>
        </div>
        <div className="input-group input-group-sm mb-3 .col-12">
          <input
            type="text"
            className="form-control support-input "
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Eg. how do I activate F&O"
          ></input>
        </div>
      </div>
      <div className="col-9"></div>
    </div>
  );
}

export default Hero;
