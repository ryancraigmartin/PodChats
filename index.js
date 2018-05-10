require('dotenv').config() // Hides environment variables.
const express = require('express');
const axios = require('axios')
const mongoose       = require('mongoose');
const path           = require('path');
const expressSession = require('express-session');
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const xmlParser = require('xml2js').parseString;
const db = require('./db');
const routes = require('./routes')
const  { User } = require('./models'); 

const app = express();

// Middleware Setup
app.use(bodyParser.json({ limit: "50mb" }));
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


// const app_name = require('./package.json').name;
// const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// // Express View engine setup
// app.use(require('node-sass-middleware')({
//     src:  path.join(__dirname, 'public'),
//     dest: path.join(__dirname, 'public'),
//     sourceMap: true
//   }));

// // Set views as the path for views
// app.set('views', path.join(__dirname, 'views')); 
// app.use(express.static(path.join(__dirname, 'public')));



// //passport config area
// passport.serializeUser((user, cb) => {
//     cb(null, user._id);
//   });
  
//   passport.deserializeUser((id, cb) => {
//     User.findById(id, (err, user) => {
//       if (err) { return cb(err); }
//       cb(null, user);
//     });
//   });
  
//   passport.use(new LocalStrategy({
//     passReqToCallback: true
//   }, (req, username, password, next) => {
//     User.findOne({ username }, (err, user) => {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         return next(null, false, { message: "Incorrect username" });
//       }
//       if (!bcrypt.compareSync(password, user.password)) {
//         return next(null, false, { message: "Incorrect password" });
//       }
  
//       return next(null, user);
//     });
//   }));

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// axios({
//     method: "The HTTP method (verb) we are going to use",
//     url: "The url the server is going to receive.", 
//     params: "URL parameters to be sent with the request" ,
//   })
//   .then(response => {
//     //Here we can do whatever we want with the response object
//   })
//   .catch(err => {
//     //Here we catch the error and display it
//   })

app.get('/', (req, res) => {


    // axios({
    //     method: "GET",
    //     url: 'https://itunes.apple.com/search?entity=podcast&term=rogan'
    //     .then((response) => {
    //         console.log("Success!");
    //         res.json()
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         next(error)
    //        })
    // })

    // // DOESNT WORK ANYMORE
    // let feed = {};
    // try {

    //     feed = await axios.get("http://joeroganexp.joerogan.libsynpro.com/rss")

    //     xmlParser(feed.data, {trim: true}, (err, result) => {

    //         result.rss.channel[0].item.map(podcast => {
    //             console.log(podcast.title[0], "\n")
    //         })
    //         res.send(result.rss.channel)
    //     })

    // } catch(error) {
    //     console.log(error)
    // }
})

routes(app)

app.listen(process.env.PORT, () => {
    console.log(`PodChats is running on PORT:${process.env.PORT}`)
})


module.exports = app;
