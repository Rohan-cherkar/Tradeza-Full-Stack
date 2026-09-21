import React, { useState, useEffect } from "react";
import axios from "axios";

// Helper: formats a number into "1.55k" / "29,875" style short form
const formatToK = (num) => {
  if (Math.abs(num) >= 1000) {
    return (num / 1000).toFixed(2) + "k";
  }
  return num.toFixed(2);
};

const Summary = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tradeza_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.username) setUserName(parsed.username);
      }
    } catch (e) {
      console.error(e);
    }

    axios
      .get("http://localhost:3000/allHoldings", { withCredentials: true })
      .then((res) => {
        console.log("allHoldings response:", res.data);
        setAllHoldings(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("Failed to fetch holdings:", err));
  }, []);

  // Same formulas as Holdings.jsx
  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0,
  );

  const currentValue = allHoldings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0,
  );

  const totalPnL = currentValue - totalInvestment;

  const pnlPercent =
    totalInvestment !== 0 ? (totalPnL / totalInvestment) * 100 : 0;

  const isOverallProfit = totalPnL >= 0;

  // Margin/funds - not derivable from holdings; placeholder until you add a Funds model
  const marginAvailable = 3740; // e.g. hardcoded or fetched from a /funds route later
  const marginsUsed = 0;
  const openingBalance = marginAvailable; // typically same as available if nothing used yet

  return (
    <>
      <div className="username">
        <h6>Hi, {userName}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatToK(marginAvailable)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{marginsUsed}</span>
            </p>
            <p>
              Opening balance <span>{formatToK(openingBalance)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isOverallProfit ? "profit" : "loss"}>
              {formatToK(totalPnL)}{" "}
              <small>
                ({isOverallProfit ? "+" : ""}
                {pnlPercent.toFixed(2)}%)
              </small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatToK(currentValue)}</span>
            </p>
            <p>
              Investment <span>{formatToK(totalInvestment)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
