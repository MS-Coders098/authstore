const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const userModel =  require("../models/users");
const bookModel =  require("../models/books");

router.get("/", authMiddleware.isLoggedIn, async (req, res) => {
    const userBook = await userModel.findOne({
        username: req.session.passport.user
    }).populate("books")
    res.render("showBooks", {nav: true, books: userBook})
})

router.get("/:id", authMiddleware.isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const oneBook = await bookModel.findById(id)
    console.log(oneBook)
    res.render("showOneBook", {nav: true, singleBook: oneBook})
})

module.exports = router;