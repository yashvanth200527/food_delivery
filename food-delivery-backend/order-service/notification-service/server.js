const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  if (event.type === "ORDER_STATUS_UPDATED") {
    console.log(
      `📩 Notification: Order ${event.data._id} is now ${event.data.status}`
    );
  }

  res.send({});
});

app.listen(4004, async () => {
  console.log("Notification Service running on port 4004");

  const res = await axios.get("http://localhost:4005/events");
  res.data.forEach(event =>
    axios.post("http://localhost:4004/events", event)
  );
});
