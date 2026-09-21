// const mongoose = require("mongoose");
// const { Schema } = require("mongoose");

// const ordersSchema = new Schema({
//   name: String,
//   qty: Number,
//   price: Number,
//   mode: String,
// });

// module.export = ordersSchema;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersSchema = new Schema({
  name: { type: String, required: true, trim: true },
  qty: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
    validate: {
      validator: Number.isInteger,
      message: "Quantity must be a whole number",
    },
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be less than 0"],
  },
  mode: { type: String, required: true, enum: ["BUY", "SELL"] },
});

module.exports = { ordersSchema };