const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const restaurantRoutes = require("./routes/restaurantRoutes");


const app = express();
app.use(cors());
app.use(express.json());

//mongoose.connect("mongodb://127.0.0.1:27017/restaurant");

app.use("/restaurants", restaurantRoutes);

app.listen(4001, () => {
  console.log("Restaurant Service running on port 4001");
});
