
const validateOrder = (req, res, next) => {
  const { name, qty, price, mode } = req.body;
  const errors = {};

  if (typeof name !== "string" || name.trim() === "") {
    errors.name = "Stock name is required";
  }

  const q = Number(qty);
  if (qty === undefined || qty === "" || !Number.isInteger(q) || q < 1) {
    errors.qty = "Quantity must be a whole number of at least 1";
  }

  const p = Number(price);
  if (price === undefined || price === "" || !Number.isFinite(p) || p < 0) {
    errors.price = "Price must be a number and cannot be less than 0";
  }

  if (!["BUY", "SELL"].includes(mode)) {
    errors.mode = "Mode must be BUY or SELL";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // Pass along clean, correctly typed values
  req.body = { name: name.trim(), qty: q, price: p, mode };
  next();
};

module.exports = validateOrder;
