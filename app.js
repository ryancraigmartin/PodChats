require("dotenv").config();
const express        = require("express");
const axios          = require("axios");
const mongoose       = require("mongoose");
const hbs            = require('hbs');
const path           = require("path");
const logger         = require('morgan');
const session        = require("express-session");
const cookieParser   = require('cookie-parser');
const flash          = require("connect-flash");
const bodyParser     = require("body-parser");
const passport       = require("passport");
const bcrypt         = require("bcrypt");
const LocalStrategy  = require("passport-local").Strategy;
const xmlParser      = require("xml2js").parseString;
const db             = require("./db");
const routes         = require("./routes");
const { User, Episode, Podcast, Review } = require("./models");


const app = express();

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
// app.use(
//   require("node-sass-middleware")({
//     src: path.join(__dirname, "./public/stylesheets"),
//     dest: path.join(__dirname, "./public/stylesheets"),
//     outputStyle: 'compressed',
//     sourceMap: true
//   })
// );
express.static(path.join(__dirname, '/public'));


app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

// Set views as the path for views.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');
app.use(flash());

// Passport Configuration
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(
  new LocalStrategy({
    passReqToCallback: true
    },
    (req, username, password, next) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(null, false, { message: "Incorrect username" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return next(null, false, { message: "Incorrect password" });
        }

        return next(null, user);
      });
    }));
// Passport Configuration End

app.use(passport.initialize());
app.use(passport.session());

routes(app);

// app.listen(process.env.PORT, () => {
//   console.log(`PodChats is running on PORT:${process.env.PORT}`);
// });

module.exports = app;