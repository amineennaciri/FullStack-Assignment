const LocalStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async(email, password, done) => {
          try {
            const user = await User.findOne({ email: email });
            if (!user) {
              //console.log("Incorrect email");
              return done(null, false, { message: "Incorrect email" });
            };
            bcrypt.compare(password, user.password, (err, res) => {
              if (res) {
                // passwords match! log user in
                return done(null, user)
              } else {
                // passwords do not match!
                //console.log('Incorrect password');
                return done(null, false, { message: "Incorrect password" })
              }
            });
          } catch(err) {
            //console.log(`error:${err}`);
            return done(err);
          };
        })
      );
    
      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(async function(id, done) {
        try {
          const user = await User.findById(id);
          done(null, user);
        } catch(err) {
          done(err);
        };
      });
}