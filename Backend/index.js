require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;

const { holdingModel } = require("./model/holdingModel");
const { positionsModel } = require("./model/positionsModel");
// const { ordersModel } = require("./model/ordersModel");
const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Db Connected");
  })
  .catch((error) => {
    console.log(error);
  });

async function main() {
  await mongoose.connect(url);
}
 
app.listen(port, () => {
  console.log("Listerning ...");
});

app.get("/",(req,res)=>{
  res.send("hello")
})

