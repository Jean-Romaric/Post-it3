const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Cela importe la stratégie OAuth2 de Google pour Passport.

passport.use(new GoogleStrategy({ //Cela configure Passport pour utiliser Google.
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },

 function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
     /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });*/
  }
));

 //Google LOGIN Route

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login-failure',
    successRedirect: '/dashboard'
  }),
 /* function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');*/
);
//Route if something goes wrong during authentication
router.get('/login-failure', (req, res) => {
  res.send('Failed to authenticate..');
});

module.exports = router;