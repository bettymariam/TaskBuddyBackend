var express = require('express');
var router = express.Router();
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var AmazonStrategy = require('passport-amazon').Strategy;
var knex = require('../db');
var cookieParser = require('cookie-parser');
console.log(process.env.SERVER_URL);

router.get('/', function(req, res, next) {
  knex('users')
    .then(user => res.json(user))
  .catch(err => next(err))
});

passport.use(new AmazonStrategy({
    clientID: 'amzn1.application-oa2-client.c7b9f74d21e541a1bafeef9d840f751b',
    clientSecret: 'caf34051ce6b53faae20f5f547472709629e75fbc2347034286746f98707188a',
    callbackURL: `${process.env.SERVER_URL}/users/auth/amazon/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    var email = profile._json.email;
    var username = profile._json.name;

  knex('users')
    .select('*')
    .where({email})
    .then(user => {
      console.log("user", user);
      let new_user = {
        username: username,
        email: email,
        refresh_token: refreshToken
      }
      if (user.length === 0){
        knex('users')
          .insert(new_user)
          .returning('*')
          .then(user => {
            return done(null, user)
          })
          .catch(err => console.log(err))
      } else {
        return done(null, user)
      }
    })
    .catch(err => console.log(err))
  }
));

router.use(passport.initialize());
router.use(passport.session());
router.use(cookieParser());

passport.serializeUser((object, done) => {
  console.log("in Serialize", object);
  done(null, {token : object.token});
})

passport.deserializeUser((object, done) => {
  done(null, object)
})

router.get('/auth/amazon',
  passport.authenticate('amazon', { scope: 'profile'}));

router.get('/auth/amazon/callback',
  passport.authenticate('amazon', { successRedirect: `${process.env.SERVER_URL}:3000/`, failureRedirect: `${process.env.SERVER_URL}/`})
);

router.get('/login', function(req,res){
  console.log("in login", req.session)
  res.json({user_id: 'hghjgh'})
})


module.exports = router;
