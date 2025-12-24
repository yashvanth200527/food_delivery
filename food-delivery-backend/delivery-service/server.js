const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  if (event.type === "ORDER_CREATED") {
    console.log("🚴 Delivery partner assigned");

    await axios.post("http://event-bus:4005/events", {
      type: "DELIVERY_ASSIGNED",
      data: {
        orderId: event.data._id,
        status: "OUT_FOR_DELIVERY"
      }
    });
  }

  res.send({});
});

app.listen(4003, async () => {
  console.log("Delivery Service running on port 4003");

  const res = await axios.get("http://event-bus:4005/events");
  for (let event of res.data) {
    await axios.post("http://localhost:4003/events", event);
  }
});
