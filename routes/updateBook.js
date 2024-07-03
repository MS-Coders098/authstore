const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const bookModel = require("../models/books");
const userModel = require("../models/users");

router.get("/:id", authMiddleware.isLoggedIn,async (req, res) => {
    const {id} = req.params;
    const previousDetails = await bookModel.findById(id);
    res.render("updateBook", {nav: true, previousDetails: previousDetails});
})

router.post("/:id", authMiddleware.isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const loggedInUser = await userModel.findOne({
        username: req.session.passport.user
    })
    const updateOne = await bookModel.findByIdAndUpdate(id, {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        user: loggedInUser._id
    }, {new: true} );
    if(!updateOne){
        return res.status(404).send("No Book to Update");
    }
    res.redirect("/showbooks");
})

module.exports = router;