const express = require("express");
const axios = require("axios");
const Order = require("../models/Order");

const router = express.Router();

// Allowed order lifecycle
const ALLOWED_STATUS_FLOW = {
  CREATED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING", "CANCELLED"],
  PREPARING: ["OUT_FOR_DELIVERY"],
  OUT_FOR_DELIVERY: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: []
};

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      status: "CREATED"
    });

    await order.save();

    await axios.post("http://event-bus:4005/events", {
      type: "ORDER_CREATED",
      data: order
    });

    res.status(201).send(order);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to create order" });
  }
});

// UPDATE ORDER STATUS
router.patch("/:id/status", async (req, res) => {
  try {
    const { status: newStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ error: "Order not found" });
    }

    const allowed = ALLOWED_STATUS_FLOW[order.status];
    if (!allowed.includes(newStatus)) {
      return res
        .status(400)
        .send({ error: "Invalid status transition" });
    }

    order.status = newStatus;
    await order.save();

    await axios.post("http://event-bus:4005/events", {
      type: "ORDER_STATUS_UPDATED",
      data: order
    });

    res.send(order);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to update order" });
  }
});

module.exports = router;
