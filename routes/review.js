const express = require("express");
let router = express.Router();
const { Review } = require("../models");

router.get("/", (req, res) => {
  Review.find({}, (err, User) => {
    res.json(Review);
  });
});

router.get("/:id/", (req, res) => {
  Review.findById(req.params.id, (err, Review) => {
    res.json(Review);
  });
});

router.post("/", (req, res) => {
  Review.create(req.body, (err, Review) => {
    res.json(Review);
  });
});

router.put("/:id", (req, res) => {
  Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, Review) => {
      res.json(Review);
    }
  );
});

module.exports = router;
