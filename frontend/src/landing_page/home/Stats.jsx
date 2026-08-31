import React from "react";
function Stats() {
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-5 mb-5 pe-5">
          <h2>Trust with confidence</h2>
          <br />
          <br />
          <h3>Customer-first always</h3>
          <p>
            That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores
            of equity investments, making us India’s largest broker;
            contributing to 15% of daily retail exchange volumes in India.
          </p>
          <br />
          <h3>No spam or gimmicks</h3>
          <p>
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like. Our
            philosophies.
          </p>
          <br />
          <h3>The Zerodha universe</h3>
          <p>
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          <br />
          <h3>Do better with money</h3>
          <p>
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>
        <div className="col-7 text-center">
          <img
            src="media\images\ecosystem.png"
            style={{ width: "80%", margin: "2rem" }}
            alt=""
          />
          <div className="text-center  ">
            <a className="me-5" href="/">
              Explore our products
              <i class="fa-solid fa-arrow-right-long"></i>
            </a>
            <a href="/">
              Try Kite demo<i class="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
