const express = require("express");
const router = express.Router();
const Home = require("./home");
const Login = require("./login");
const Signup = require("./signup");
// const ProfilePage = require("./profilepage");
const User = require("./user");
const Search = require("./search");
const Episode = require("./episode");
const Podcast = require("./podcast");
const Review = require("./review");

// Adds prefix to routes and specifies their use with the routes function.
const routes = app => {
  app.use("/", Home);
  app.use("/login", Login);
  app.use("/", Signup);
  // app.use("/profilepage", ProfilePage)
  app.use("/users", User);
  app.use("/search", Search);
  app.use("/episode", Episode);
  app.use("/podcast", Podcast);
  app.use("/review", Review);
};

module.exports = routes;
