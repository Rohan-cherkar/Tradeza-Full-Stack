import React from "react";
import { Link } from "react-router-dom";
function RightImage({ imageURL, productName, productDescription, learnMore }) {
  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-5  ms-5 pe-5">
            <h3
              style={{ marginTop: "85px", paddingRight: "50px" }}
              className="pt-4  "
            >
              {productName}
            </h3>
            <p>{productDescription}</p>
            <div>
              {learnMore && (
                <Link className="" to={learnMore.url}>
                  {learnMore.name} <i class="fa-solid fa-arrow-right"></i>
                </Link>
              )}
            </div>
            <br />
          </div>
          <div className="col-6">
            <img src={imageURL} alt="" style={{ width: "80%" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default RightImage;
