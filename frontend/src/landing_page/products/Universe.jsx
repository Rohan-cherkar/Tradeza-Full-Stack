import React from "react";
import UniverseLogo from "./universeLogo";
function Universe() {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row text-center ">
          <h4 className="text-center">The Zerodha Universe</h4>
          <br />
          <br />
          <p className="text-center mb-5">
            Extend your trading and investment experience even further with our
            partner platforms
          </p>
          {/* <div className="col-12 "> */}
          <div className="col-4 ">
            <UniverseLogo
              url1="media\images\zerodhaFundhouse.png"
              description1="Our asset management venture
                that is creating simple and transparent index
                funds to help you save for your goals."
              url2="\media\images\sensibullLogo.svg"
              description2="Options trading platform that lets you
create strategies, analyze positions, and examine
data points like open interest, FII/DII, and more."
            />
          </div>
          <div className="col-4 ">
            <UniverseLogo
              url1="media\images\tijori.svg"
              description1="Investment research platform
that offers detailed insights on stocks,
sectors, supply chains, and more.
"
              url2="\media\images\streakLogo.png"
              description2="Systematic trading platform
that allows you to create and backtest
strategies without coding."
            />
          </div>
          <div className="col-4 ">
            <UniverseLogo
              url1="media\images\smallcaseLogo.png"
              description1="Investment research platform
that offers detailed insights on stocks,
sectors, supply chains, and more.
"
              url2="\media\images\dittoLogo.png"
              description2="Systematic trading platform
that allows you to create and backtest
strategies without coding."
            />
          </div>
          <div className="text-center mb-5 mt-3">
            <button className="btn btn-primary " style={{ width: "150px" }}>
              Sign up for free
            </button>
          </div>

          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Universe;
