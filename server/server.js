const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const mainRoutes = require('./routes/main');
const dashboardRoutes = require('./routes/dashboard');
const connectDB = require("./config/database");
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
require('./config/passport')(passport);
//Connect To Database
//connectDB();
app.use(passport.initialize());
// you will have access to the currentUser variable in all of your views, and you won’t have to manually pass it into all of the controllers in which you need it.
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/", mainRoutes);
app.use("/dashboard", dashboardRoutes);

connectDB().then(()=>{
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    });
})