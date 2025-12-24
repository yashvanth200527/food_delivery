const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error(err));


app.use("/orders", orderRoutes);

app.listen(4002, () => {
  console.log("Order Service running on port 4002");
});
