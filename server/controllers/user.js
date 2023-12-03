const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const validator = require('validator');

const logInMiddleware = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
});

module.exports = {
    getSignUp: (req,res)=>{
        res.render('signup.ejs');
    },
    getLogIn: (req,res)=>{
      res.render('login.ejs');
    },
    postSignUp: async (req, res, next)=>{
        const validationErrors = []
        if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
        if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
        if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
        if (validationErrors.length) {
          req.flash('errors', validationErrors)
          return res.redirect('../signup')
        }
        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
        bcrypt.hash(req.body.password, 10, async   (err, hashedPassword) => {
          try {
            const existingUser = await User.findOne({
              $or: [
                { email: req.body.email },
                { firstName: req.body.firstN },
                { lastName: req.body.lastN }
              ]
            });
            if (existingUser) {
              req.flash('errors', { msg: 'Account with that email address or username already exists.' });
              return res.redirect('../signup');
            }
            const user = new User({
              firstName: req.body.firstN,
              lastName: req.body.lastN,
              userName: req.body.userN,
              email:req.body.email,
              password: hashedPassword,
            });
            const result = await user.save();
            res.redirect("/dashboard");
          } catch(err) {
            return next(err);
          };
        });
      },
      postLogIn: (req, res, next)=> {
        logInMiddleware(req, res, next);
      },
      getLogOut: (req, res, next) => {
        req.logout(function (err) {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      },
}