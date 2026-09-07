const {schema}=require("mongoose")

const ordersSchema = new Schema({
  name: String,
  price: Number,
  price: Number,
  mode: String,
});

module.export= {ordersSchema}

