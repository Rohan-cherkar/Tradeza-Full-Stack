import React, { useState } from "react";

function Dropdown({ heading, points }) {
  const [showPoints, setShowPoints] = useState(false);

  return (
    <div className="col-12 p-5 pt-0  mx-auto ">
      <h4
        onClick={() => setShowPoints(!showPoints)}
        style={{ cursor: "pointer" }}
      >
        <i
          className={`fa ${showPoints ? "fa-minus-circle" : "fa-plus-circle"}`}
          aria-hidden="true"
        ></i>{" "}
        {heading}
      </h4>

      {showPoints && (
        <div>
          {points.map((element, index) => (
            <React.Fragment key={index}>
              <a
                href=""
                style={{
                  textDecoration: "none",
                  lineHeight: "2.5",
                }}
              >
                {element}
              </a>
              <br />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
