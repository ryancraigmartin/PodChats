const express = require("express");
const User = require("../models/User");
const ensureLogin = require("connect-ensure-login");
const passport = require("passport");
const router = express.Router();
const flash = require("connect-flash");

// Bcrypt to encrypt passwords.
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.signup_username;
  const password = req.body.signup_password;
  // const email = req.body.signup_email;
  // const name = req.body.signup_name;
  if (username === "" || password === "") {
    res.render("signup", {
      message: "Please fill all fields."
    });
    return;
  }

  User.findOne({
    username: username
  }, "username", (err, user) => {
    if (user !== null) {
      res.render("signup", {
        message: "Sorry, that username already exists"
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
      // email,
      // name
    });

    newUser.save(err => {
      if (err) {
        res.render("signup", {
          message: "Something went wrong"
        });
      } else {
        res.redirect("/");
      }
    });
  });
});

//=====================================================Login

router.get('/login', (req, res, next) => {
  res.render('login', {
    message: req.flash('error')
  });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/private-page',
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true
  })
);

// ======== Private Page user can view after login =====

router.get('/user-dashboard', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('index', {
    user: req.user
  });
});

// ===== Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;