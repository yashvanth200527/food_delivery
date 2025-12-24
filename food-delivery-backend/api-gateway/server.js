const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Docker service names (NOT localhost)
const RESTAURANT_SERVICE = "http://restaurant-service:4001";
const ORDER_SERVICE = "http://order-service:4002";

// -------- RESTAURANT ROUTES --------

app.get("/restaurants", async (req, res) => {
  try {
    const response = await axios.get(`${RESTAURANT_SERVICE}/restaurants`);
    res.send(response.data);
  } catch (err) {
    res.status(503).send({ error: "Restaurant service unavailable" });
  }
});

app.post("/restaurants", async (req, res) => {
  try {
    const response = await axios.post(
      `${RESTAURANT_SERVICE}/restaurants`,
      req.body
    );
    res.status(201).send(response.data);
  } catch (err) {
    res.status(503).send({ error: "Restaurant service unavailable" });
  }
});

// -------- ORDER ROUTES --------

app.post("/orders", async (req, res) => {
  try {
    const response = await axios.post(
      `${ORDER_SERVICE}/orders`,
      req.body
    );
    res.status(201).send(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(503).send({ error: "Order service unavailable" });
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${ORDER_SERVICE}/orders/${req.params.id}`
    );
    res.send(response.data);
  } catch (err) {
    res.status(503).send({ error: "Order service unavailable" });
  }
});

app.patch("/orders/:id/status", async (req, res) => {
  try {
    const response = await axios.patch(
      `${ORDER_SERVICE}/orders/${req.params.id}/status`,
      req.body
    );
    res.send(response.data);
  } catch (err) {
    res.status(503).send({ error: "Order service unavailable" });
  }
});

app.listen(4000, () => {
  console.log("API Gateway running on port 4000");
});
