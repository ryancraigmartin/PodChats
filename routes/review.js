const express = require("express");
let router = express.Router();
const { Review } = require("../models");
const { Episode } = require("../models");
const { User } = require("../models");

router.get("/", (req, res) => {
  Review.find({}, (err, User) => {
    res.json(Review);
  });
});

router.get("/:id/", (req, res) => {
  Review.find({episodeID: req.params.id})
  .then((response) => {
    res.render('review', {reviews: response})
  })
  .catch((error) => {
    console.log(error);
    next(error)
   })
  });

  router.get("/new/:episodeID", (req, res) => {
    Episode.findById(req.params.episodeID)
    .then((response) => {
      res.render('review', {episode: response})
    })
    .catch((error) => {
      console.log(error);
      next(error)
     })
  });

router.post("/create", (req, res) => {
  Review.create({ 
    reviewTitle: req.body.review_title,
    reviewContent: req.body.review_content,
    userID: req.user._id,
    episodeID: req.body.episodeID
   })
  .then((response) => {
    res.redirect(`/episodedetails`)
  })
  .catch((error) => {
    console.log(error);
    next(error)
   })
  });

// router.put("/:id", (req, res) => {
//   Review.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (err, Review) => {
//       res.json(Review);
//     }
//   );
// });

module.exports = router;
