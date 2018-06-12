const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const ensureLogin = require("connect-ensure-login");
const flash = require("connect-flash");

router.get("/", (req, res, next) => {
  res.render("login", { message: req.flash("error") });
});

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/", (req, res) => {
  req.logout();
  res.redirect("login");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("login");
  }
}

module.exports = router;
