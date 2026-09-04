import React from "react";
import {Link} from "react-router-dom"
 function Hero() {
  return (
    <>
      <div className="container about-hero">
        <h3 className="text-center">
          We pioneered the discount broking model in India. <br /> Now, we are
          breaking ground with our technology.
        </h3>
      </div>
      <hr
        style={{
          width: "80%",
          marginLeft: "10%",
          opacity: 0.1,
          marginBottom: "100px",
        }}
      />
      <div className="row " style={{ margin: "0px 130px" }}>
        <div className="col-6 pe-5">
          <p>
            We kick-started operations on the 15th of August, 2010 with the goal
            of breaking all barriers that traders and investors face in India in
            terms of cost, support, and technology. We named the company
            Zerodha, a combination of Zero and "Rodha", the Sanskrit word for
            barrier.
          </p>
          <br />
          <p>
            Today, our disruptive pricing models and in-house technology have
            made us the biggest stock broker in India.
          </p>
          <br />
          <p>
            Over 1.6+ crore clients place billions of orders every year through
            our powerful ecosystem of investment platforms, contributing over
            15% of all Indian retail trading volumes.
          </p>
          <br />
        </div>
        <div className="col-6 pe-5">
          <p>
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.
          </p>
          <br />
          <p>
            <Link to='/'>Rainmatter</Link>
            , our fintech fund and incubator, has invested in several
            fintech startups with the goal of growing the Indian capital
            markets.
          </p>
          <br />
          <p>
            And yet, we are always up to something new every day. Catch up on
            the latest updates on our blog or see what the media is saying about
            us or learn more about our business and product philosophies.
          </p>
          <br />
        </div>
        <div className="col-6"></div>
      </div>
    </>
  );
}

export default Hero;
