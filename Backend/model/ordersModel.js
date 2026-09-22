const { model } = require("mongoose");
const { ordersSchema } = require("../schema/ordersSchema");

const ordersModel = model("Order", ordersSchema);

module.exports = ordersModel;

