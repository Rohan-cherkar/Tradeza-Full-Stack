const { model } = require("mongoose");
const { ordersSchema } = require("../schema/ordersSchema");

const ordersModel = new model("Order", ordersSchema);

module.exports = { ordersModel };
