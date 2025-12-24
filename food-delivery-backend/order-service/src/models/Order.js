const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  restaurantId: String,
  items: Array,
  status: {
    type: String,
    default: "CREATED"
  }
});

module.exports = mongoose.model("Order", orderSchema);
