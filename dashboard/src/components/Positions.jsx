import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const Positions = () => {
  const [allPosition, setAllPosition] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/allPositions`)
      .then((res) => {
        setAllPosition(Array.isArray(res.data) ? res.data : []);
      })

      .catch((err) => {
        console.error("Failed to fetch positions:", err);
        setAllPosition([]);
      });
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPosition.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPosition.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
