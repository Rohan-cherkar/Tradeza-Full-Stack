const { Schema } = require("mongoose");
const holdingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // must match the name in mongoose.model("User", userSchema)
    required: true,
    index: true,
  },
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
}, { timestamps: true },);

module.exports = { holdingSchema };





// optional: one row per stock per user
// holdingSchema.index({ user: 1, name: 1 }, { unique: true });

