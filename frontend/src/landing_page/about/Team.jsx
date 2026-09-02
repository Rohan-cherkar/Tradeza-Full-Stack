import React from "react";
function Team() {
  return (
    <>
      <div className="container team-container">
        <div className="row">
          <h3 className="text-center mb-5">People</h3>
          <div className="col-5 ">
            <img
              src="/media/images/Rohan.jpeg"
              alt=""
              className="about-main-image offset-3"
            /> <br /><br />
            <h4 className="text-center ms-5">Rohan Cherkar</h4>
          </div>
          <div
            className="col-7  pe-5"
            style={{ width: "600px", color: "#3c3b3b" }}
          >
            <p>
              I’m a passionate Full-Stack Developer with a strong foundation in
              JavaScript, React, Node.js, Express, and MongoDB. I recently
              completed my Bachelor’s degree in Information Technology from
              Mumbai University.{" "}
            </p>
            <p>
              I enjoy building responsive, user-friendly, and scalable web
              applications.{" "}
            </p>
            <p>
              I have worked on several projects involving MERN Stack, Python,
              AI/ML, and cloud technologies.{" "}
            </p>
            <p>
              I’m always eager to learn new technologies and improve my
              problem-solving skills.{" "}
            </p>
            <p>
              Currently, I’m looking for opportunities where I can contribute my
              skills and grow as a developer.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Team;
