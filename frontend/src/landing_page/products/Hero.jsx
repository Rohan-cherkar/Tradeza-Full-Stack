import React from "react";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <>
      <div className="container product-hero text-center">
        <h2>Zerodha Products</h2>
        <h4>Sleek, modern, and intuitive trading platforms</h4><br />
        <p className="fs-5">
          Check out our 
          <Link> investment offerings →</Link>{" "}
        </p>
      </div>
      <hr style={{width:"80%", margin:"10%",opacity:0.12}}/>

    </>
  );
}

export default Hero;
