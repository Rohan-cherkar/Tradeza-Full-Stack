import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionsWindow.css";

const validate = (qty, price) => {
  const errors = {};
  const q = Number(qty);
  const p = Number(price);

  if (qty === "" || Number.isNaN(q)) {
    errors.qty = "Quantity is required";
  } else if (!Number.isInteger(q)) {
    errors.qty = "Quantity must be a whole number";
  } else if (q < 1) {
    errors.qty = "Quantity must be at least 1";
  }

  if (price === "" || Number.isNaN(p)) {
    errors.price = "Price is required";
  } else if (p < 0) {
    errors.price = "Price cannot be less than 0";
  }

  return errors;
};

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [errors, setErrors] = useState({});
  const generalContext = useContext(GeneralContext);

  const handleQtyChange = (e) => {
    const value = e.target.value;
    setStockQuantity(value);
    setErrors(validate(value, stockPrice));
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setStockPrice(value);
    setErrors(validate(stockQuantity, value));
  };

  const handleBuyClick = async (e) => {
    e.preventDefault();

    const validationErrors = validate(stockQuantity, stockPrice);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await axios.post(
        "http://localhost:3000/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
        },
        { withCredentials: true },
      );
      generalContext.closeBuyWindow();
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  const hasErrors = Object.keys(validate(stockQuantity, stockPrice)).length > 0;

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={handleQtyChange}
              value={stockQuantity}
              min={1}
              step={1}
              required
            />
            {errors.qty && <small className="error-text">{errors.qty}</small>}
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min={0}
              onChange={handlePriceChange}
              value={stockPrice}
              required
            />
            {errors.price && (
              <small className="error-text">{errors.price}</small>
            )}
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button
            type="button"
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={hasErrors}
          >
            Buy
          </button>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
