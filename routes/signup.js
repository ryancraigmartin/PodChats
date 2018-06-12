const express = require("express");
const User = require("../models/User");
const Podcast = require("../models/Podcast");
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
  const email = req.body.signup_email;
  const name = req.body.signup_name;
  if (username === "" || password === "") {
    res.render("signup", {
      message: "Please fill all fields."
    });
    return;
  }

  User.findOne(
    {
      username: username
    },
    "username",
    (err, user) => {
      if (user !== null) {
        res.render("signup", {
          message: "Sorry, that username already exists"
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username: username,
        password: hashPass,
        email: email,
        name: name
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
    }
  );
});

//=====================================================Login

router.get("/login", (req, res, next) => {
  res.render("login", {
    message: req.flash("error")
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user-dashboard",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

// ======== Private Page user can view after login =====

router.get("/user-dashboard", ensureLogin.ensureLoggedIn(), (req, res) => {
  Podcast.find()
    .then(result => {
      console.log(result);
      console.log(result.title);
      console.log(result.feedUrl);
      console.log(result.imageUrl);
      res.render("index", { podcast: result, user: req.user });
    })
    .catch(error => {
      console.log(error);
      next(error);
      // res.render('index', {
      //   user: req.user,
      // });
    });
  //   console.log("Req.params", req.params)
});

// router.get('/user-dashboard', ensureLogin.ensureLoggedIn(), (req, res) => {
//   Podcast.find()
//   .then((result) => {
//     console.log(result);
//       res.render('index', {podcast: result})
//   })
//   .catch((error) => {
//     console.log(error);
//     next(error)
//    })
// })

// ===== Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
