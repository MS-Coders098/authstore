const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const bookModel = require("../models/books");
const userModel = require("../models/users");

router.get("/", authMiddleware.isLoggedIn, async (req, res) => {
    const allBooks = await bookModel.find().populate("user");
    res.render("bookStore", {nav: true, allBooks: allBooks});
})

module.exports = router;