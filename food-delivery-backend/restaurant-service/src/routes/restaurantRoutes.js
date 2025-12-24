const express = require("express");
const router = express.Router();

// GET all restaurants (mock)
router.get("/", (req, res) => {
  res.send([
    { id: "r1", name: "Pizza Hut", location: "Chennai", isOpen: true },
    { id: "r2", name: "Burger King", location: "Bangalore", isOpen: true }
  ]);
});

// CREATE restaurant (mock)
router.post("/", (req, res) => {
  res.status(201).send({
    message: "Restaurant created successfully",
    data: req.body
  });
});

module.exports = router;
