require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const validateOrder = require("./Middlewares/ValidateOrders");
const { requireAuth } = require("./Middlewares/AuthMiddleware");

const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;

const authRoute = require("./Routes/AuthRoute");

const { holdingModel } = require("./model/holdingModel");
const { positionsModel } = require("./model/positionsModel");
const ordersModel = require("./model/ordersModel");
// const { ordersModel } = require("./model/ordersModel");

const allowedOrigins = [
  "https://zerodha-clone-full-stack.vercel.app/",
  "https://zerodha-clone-full-stack.vercel.app",
  "https://tradeza-full-stack.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:5173",
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ""));
}
if (process.env.DASHBOARD_URL) {
  allowedOrigins.push(process.env.DASHBOARD_URL.replace(/\/$/, ""));
}
if (process.env.ALLOWED_ORIGINS) {
  process.env.ALLOWED_ORIGINS.split(",").forEach((origin) => {
    const clean = origin.trim().replace(/\/$/, "");
    if (clean && !allowedOrigins.includes(clean)) allowedOrigins.push(clean);
  });
}

// Trust reverse proxy for HTTPS cookie handling on Render
app.set("trust proxy", 1);

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.endsWith(".vercel.app")
      ) {
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

app.get("/auth/verify", requireAuth, (req, res) =>
  res.json({ user: req.user }),
);

app.get("/allHoldings", requireAuth, async (req, res) => {
  try {
    let allHoldings = await holdingModel.find({ user: req.user._id });
    res.json(allHoldings);
  } catch (err) {
    console.error("Error fetching holdings:", err);
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await positionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    console.error("Error fetching positions:", err);
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

app.post("/newOrder", requireAuth, validateOrder, async (req, res) => {
  try {
    const { name, price, qty, mode } = req.body;
    const orderQty = Number(qty);
    const orderPrice = Number(price);

    const holding = await holdingModel.findOne({ user: req.user._id, name });

    if (mode === "BUY") {
      if (holding) {
        const totalQty = holding.qty + orderQty;
        holding.avg =
          (holding.avg * holding.qty + orderPrice * orderQty) / totalQty;
        holding.qty = totalQty;
        holding.price = orderPrice;
        await holding.save();
      } else {
        await holdingModel.create({
          user: req.user._id,
          name,
          qty: orderQty,
          avg: orderPrice,
          price: orderPrice,
          net: "0.00%",
          day: "0.00%",
        });
      }
    }
    // else if (mode === "SELL") {
    //   if (!holding || holding.qty < orderQty) {
    //     return res.status(400).send("Not enough shares to sell");
    //   }
    //   holding.qty -= orderQty;
    //   if (holding.qty === 0) await holding.deleteOne();
    //   else await holding.save();
    // }

    await ordersModel.create({
      user: req.user._id,
      name,
      price: orderPrice,
      qty: orderQty,
      mode,
    });
    res.send("Order Saved");
  } catch (err) {
    console.error("Order failed:", err);
    res.status(500).send("Order failed");
  }
});
