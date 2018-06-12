const express = require("express");
const router = express.Router();
const SearchService = require("../service/search");
const Search = new SearchService();
const axios = require("axios");
const { Episode } = require("../models");
const { Review } = require("../models");

router.get("/", (req, res) => {
  Episode.find({}, (err, Episode) => {
    res.render("episode");
  });
});

router.get("/:podcastID", (req, res) => {
  Episode.find({ podcastID: req.params.podcastID })
    .then(response => {
      res.render("episode", { episodes: response });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

router.get("/:id", (req, res) => {
  Episode.findById(req.params.id)
    .then(response => {
      Reviews.find({ episodeID: response._id })
        .then(reviews => {
          res.render("episodedetails", {
            episode: response,
            reviews: reviews
          });
        })
        .catch(error => {
          console.log(error);
          next(error);
        });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

router.post("/", (req, res) => {
  Episode.create(req.body, (err, Episode) => {
    res.json(Episode);
  });
});

module.exports = router;
