const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  if (event.type === "ORDER_CREATED") {
    console.log("Assigning delivery partner...");
    await axios.post("http://localhost:4005/events", {
      type: "DELIVERY_ASSIGNED",
      data: event.data
    });
  }

  res.send({});
});

app.listen(4003, async () => {
  console.log("Delivery Service running on port 4003");

  const res = await axios.get("http://localhost:4005/events");
  res.data.forEach(event =>
    axios.post("http://localhost:4003/events", event)
  );
});
