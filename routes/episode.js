const express = require("express");
const router = express.Router();
const SearchService = require("../service/search");
const Search = new SearchService();
const axios = require("axios");
const { Episode } = require("../models");

router.get("/", (req, res) => {
  Episode.find({}, (err, Episode) => {
    res.render("episode");
  });
});

router.get('/:id', (req, res) => {
  Episode.find({podcastID: req.params.id})
    .then((response) => {
      res.render('episode', { episodes: response})
    })
    .catch((error) => {
      console.log(error);
      next(error)
     })
  })

router.post("/", (req, res) => {
  Episode.create(req.body, (err, Episode) => {
    res.json(Episode);
  });
});

module.exports = router;
