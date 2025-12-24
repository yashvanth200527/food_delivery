const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  isOpen: Boolean,
  menu: [
    {
      name: String,
      price: Number
    }
  ]
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
