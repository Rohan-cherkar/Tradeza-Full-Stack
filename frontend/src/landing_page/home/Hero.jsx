import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container p-5 home-hero">
      <div className="row text-center ">
        <img
          src="media/images/homeHero.png"
          alt="Hero Image"
          className="mb-5"
        />
        <h1 className="mt-3">Invest in Everything</h1>
        <p>
          Online Platform to invest in Stocks, derivatives, mutual funds, and
          more
        </p>
        <Link
          to="/signup"
          className="btn btn-primary p-2 d-inline-block"
          style={{ width: "23%", minWidth: "180px", margin: "0 auto" }}
        >
          <b>Sign up For Free</b>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
