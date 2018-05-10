// const express     = require("express");
// const router      = express.Router();
// const passport    = require("passport");
// const User        = require("../models/User");
// const ensureLogin = require("connect-ensure-login");
// const flash       = require("connect-flash");

// // Bcrypt to encrypt passwords.
// const bcrypt = require("bcrypt");
// const bcryptSalt = 10;

// router.get("/", (req, res, next) => {
//   res.render("signup");
// });

// router.post("/", (req, res, next) => {
//   const username = req.body.signup_username;
//   const password = req.body.signup_password;
//   const email = req.body.signup_email;
//   const name = req.body.signup_name;

//   if (username === "" || password === "" || email === "" || name === "") {
//     res.render("signup", { message: "Please fill all fields." });
//     return;
//   }

//   User.findOne({ username: username }, "username", (err, user) => {
//     if (user !== null) {
//       res.render("signup", { message: "Sorry, that username already exists" });
//       return;
//     }

//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);

//     const newUser = new User({
//       username: username,
//       password: hashPass,
//       email: email,
//       name: name
//     });

//     newUser.save(err => {
//       if (err) {
//         res.render("signup", { message: "Something went wrong" });
//       } else {
//         res.redirect("/");
//       }
//     });
//   });
// });

// module.exports = router;

