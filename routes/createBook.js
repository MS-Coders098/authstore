const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const userModel =  require("../models/users");
const bookModel =  require("../models/books");

router.get("/", authMiddleware.isLoggedIn, (req, res) => {
    res.render("createBook", {nav: true});
})

router.post("/", authMiddleware.isLoggedIn, async (req, res) => {
    const loggedInUser = await userModel.findOne({
        username: req.session.passport.user
    })
    const userBook = await bookModel.create({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        user: loggedInUser._id
    })
    loggedInUser.books.push(userBook._id);
    await loggedInUser.save()
    res.redirect("/showbooks");
})

module.exports = router;