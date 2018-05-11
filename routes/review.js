const express = require("express");
let router = express.Router();
const { Review } = require("../models");

router.get("/", (req, res) => {
  Review.find({}, (err, User) => {
    res.json(Review);
  });
});

router.get("/:id/", (req, res) => {
  Review.find({episodeID: req.params.id})
  .then((response) => {
    res.render('blah', {reviews: response})
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

router.post("/", (req, res) => {
  Review.create(req.body, (err, Review) => {
    res.json(Review);
  });
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
