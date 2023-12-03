module.exports = {
    ensureAuth: async function (req, res, next, err) {
      try {
        if (req.isAuthenticated()) {
          return next()
        }  
      } catch (error) {
        console.log(err);
        res.redirect('/')
      }
    }
  }
  
  // this middleware checks if we are logged in, if not it will send us back to home page, this allows us to secure our dashboard pages so that no one can bypass the sign in wall.