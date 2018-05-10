const express = require("express");
const router = express.Router();
const SearchService = require("../service/search");
const Search = new SearchService();
const axios = require("axios");
const { Podcast } = require("../models");

router.get("/", (req, res) => {
  Podcast.find({}, (err, Podcast) => {
    res.json(Podcast);
  });
});

router.post("/", (req, res) => {
  Podcast.create(req.body, (err, Podcast) => {
    res.json(Podcast);
  });
});

module.exports = router;
