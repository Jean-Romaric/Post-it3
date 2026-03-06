const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Cela importe la stratégie OAuth2 de Google pour Passport.
const User = require('../models/User'); //Cela importe le modèle User, qui est utilisé pour interagir avec la base de données MongoDB pour stocker et récupérer les informations

passport.use(new GoogleStrategy({ //Cela configure Passport pour utiliser Google.
  clientID: process.env.GOOGLE_CLIENT_ID,//identifiant de mon application
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,//mot de passe de mon application
  callbackURL: process.env.GOOGLE_CALLBACK_URL //URL où Google renvoie l'utilisateur après l'authentification. Cette URL doit être enregistrée dans la console de développeur Google pour ton application.
},

  async function (accessToken, refreshToken, profile, done) { //Elle s'exécute quand l'utilisateur s'est connecté avec Google.
    //console.log(profile);
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      profileImage: profile.photos[0].value
    }
    /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
     return cb(err, user);
   });*/
    try {
      let user = await User.findOne({ googleId: profile.id }); //On cherche dans la base de données un utilisateur avec le même googleId que celui du profil Google de l'utilisateur qui vient de se connecter. Si on trouve un utilisateur, cela signifie que cet utilisateur s'est déjà connecté auparavant avec Google, et on peut simplement retourner cet utilisateur.
      if (user) {
        done(null, user);
      } else {
        user = await User.create(newUser); //Si on ne trouve pas d'utilisateur avec ce googleId, cela signifie que c'est la première fois que cet utilisateur se connecte avec Google. Dans ce cas, on crée un nouvel utilisateur dans la base de données en utilisant les informations du profil Google de l'utilisateur. Après avoir créé le nouvel utilisateur, on le retourne.
        done(null, user);
      }
    } catch (err) {
      console.log(err);
    }

  }
));

//Google LOGIN Route

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));//Je veux accéder aux informations de profil de l'utilisateur. Lorsque l'utilisateur accède à cette route, il est redirigé vers la page de connexion de Google. Après que l'utilisateur se soit connecté et ait autorisé l'accès à son profil, Google redirige l'utilisateur vers la route de rappel spécifiée dans callbackURL.

router.get('/google/callback', // Après essaie d'authentification google redirige vers cette route /login-failure si echoue(utilisateur peut mettre annuler) et si reussite redirige vers dashboard 
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
  res.send('Failed to authenticate... Please try again.');
});

// Conserver les données utilisateur après une authentification réussie
passport.serializeUser((user, done) => { //serializeUser stocker l'id dans la session                                         
  done(null, user.id); //la donnée qu'on veut stoker dans la session 
});

//Récupérer les données utilisateur de la session
passport.deserializeUser((id, done) => {//"deserialize" : User récupérer l'utilisateur depuis la base
  // On cherche l'utilisateur dans la base de données
  // en utilisant son id
  User.findById(id, (err, user) => {
    // done() indique à Passport que l'opération est terminée
    // err : s'il y a une erreur
    // user : l'utilisateur récupéré dans la base de données
    done(err, user);
  });
});

module.exports = router;