import React from "react";
function UniverseLogo({ url1, description1, url2, description2 }) {
  return (
    <>
      <div className="universe-div">
        <div>
          <img src={url1} alt="" className="universe-img" />
          <p className="universe-info">{description1}</p>
        </div>
        <br />

        <div>
          <div className="universe-div">
            <img src={url2} alt="" className="universe-img" />
            <p className="universe-info ">{description2}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UniverseLogo;
