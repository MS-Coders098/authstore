const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require("passport-local");
const userModel = require("../models/users");

passport.use(new localStrategy(userModel.authenticate()));

router.get("/", (req, res) => {
    res.render("register", {nav: false})
})

router.get("/login", (req, res) => {
  res.render("login", {nav: false, error: req.flash('error')})
})

router.post('/register', (req, res) => {
    const userData = new userModel({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email
    })

    userModel.register(userData, req.body.password)
    .then(() => {
        passport.authenticate("local")(req, res, function(){
            res.redirect("/createbook")
        })
    })
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/createbook",
  failureRedirect: "/login",
  failureFlash: true
}), function (req, res) { })

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err)
      }
      res.redirect("/login")
    })
})
 

module.exports = router;