require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser=require("body-parser")
const cors=require("cors")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const validateOrder =require("./Middlewares/ValidateOrders")

const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;


const authRoute = require("./Routes/AuthRoute");

const  {holdingModel}  = require("./model/holdingModel");
const { positionsModel } = require("./model/positionsModel");
const  ordersModel  = require("./model/ordersModel");
// const { ordersModel } = require("./model/ordersModel");


const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);


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

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await holdingModel.find({});
  res.json(allHoldings);
  // res.send("hello");
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await positionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", validateOrder, async (req, res) => {
  try {
    let newData = req.body;

    let newOrder = new ordersModel({
      name: newData.name,
      price: newData.price,
      qty: newData.qty,
      mode: newData.mode,
    });
    await newOrder.save();
    const orderQty = Number(newData.qty);
    const orderPrice = Number(newData.price);
    const mode = newData.mode;

    // let holding = await holdingModel.findOne({ name: newData.name });

    if (mode === "BUY") {
      const newHolding = new holdingModel({
        name: newData.name,
        qty: orderQty,
        avg: orderPrice,
        net: "0.00%",
        day: "0.00%",
      });
      await newHolding.save();
    } else {
      // SELL with no existing holding - invalid, nothing to sell
      return res.status(400).send("Cannot sell a stock you don't hold");
    }

    res.send("Order Saved");
  } catch (err) {
    if (err.response?.status === 400) {
      setErrors(err.response.data.errors);
    } else {
      console.error("Order failed:", err);
    }
  }
});