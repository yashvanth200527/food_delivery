const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  console.log("Event received:", event.type);
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Event Bus running on port 4005");
});
