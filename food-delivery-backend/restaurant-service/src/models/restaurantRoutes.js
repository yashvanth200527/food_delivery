const express = require("express");
const Restaurant = require("../models/Restaurant");
const router = express.Router();

router.post("/", async (req, res) => {
  const restaurant = new Restaurant(req.body);
  await restaurant.save();
  res.status(201).send(restaurant);
});

router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find({ isOpen: true });
  res.send(restaurants);
});

router.get("/:id/menu", async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.send(restaurant.menu);
});

module.exports = router;
