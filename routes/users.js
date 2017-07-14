var express = require('express');
var router = express.Router();
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var AmazonStrategy = require('passport-amazon').Strategy;
var knex = require('../db')

console.log("in users")

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('in /users');
  // knex('users')
  //   .then(user => res.json(user))
  // .catch(err => next(err))
});

passport.use(new AmazonStrategy({
    clientID: 'amzn1.application-oa2-client.c7b9f74d21e541a1bafeef9d840f751b',
    clientSecret: 'caf34051ce6b53faae20f5f547472709629e75fbc2347034286746f98707188a',
    callbackURL: "http://localhost:3000/users/auth/amazon/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile)
  //   User.findOrCreate({ amazonId: profile.id }, function (err, user) {
  //     return done(err, user);
  //   });
   return done(null, {accessToken, refreshToken, profile})
  }
));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((object, done) => {
  console.log("in Serialize", object);
  done(null, {token : object.token})
})

passport.deserializeUser((object, done) => {
  console.log("in DeSerialize", object);
  done(null, object)
})


router.get('/auth/amazon',
  passport.authenticate('amazon', { scope: 'profile'}), function(req,res){
    console.log("to amazon")
  });

router.get('/auth/amazon/callback',
  passport.authenticate('amazon', { successRedirect: 'http://localhost:3001/dashboard', failureRedirect: 'http://localhost:3001' })
);


module.exports = router;
