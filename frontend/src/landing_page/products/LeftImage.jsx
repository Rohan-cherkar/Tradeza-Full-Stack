import React from "react";
import { Link } from "react-router-dom";
function LeftImage({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8">
        
            <img src={imageURL} alt="" style={{ width: "75%" , height:"75%" }} />
          </div>
          <div className="col-4 mt-5 pe-5">
            <h3 className="pt-4 ">{productName}</h3>
            <p>{productDescription}</p>
            <div>
              {tryDemo && (
                <Link className="me-5" to={tryDemo.url}>
                  {tryDemo.name} <i class="fa-solid fa-arrow-right"></i>
                </Link>
              )}

              {learnMore && (
                <Link className="ms-5" to={learnMore.url}>
                  {learnMore.name} <i class="fa-solid fa-arrow-right"></i>
                </Link>
              )}
            </div>
            <br />
            <div>
              <Link className="mt-5">
                <img src="/media/images/googlePlayBadge.svg" alt="" />
              </Link>
              <Link className="ms-5">
                <img src="\media\images\appstoreBadge.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftImage;
