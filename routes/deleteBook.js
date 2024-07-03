const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const bookModel = require("../models/books");

router.get("/:id", authMiddleware.isLoggedIn, async (req, res) => {
  res.render("deleteBook", { nav: true });
});

router.post("/:id", authMiddleware.isLoggedIn ,async (req, res) => {
  const { id } = req.params;
  const deleteOneBook = await bookModel.findByIdAndDelete(id);
  if(!deleteOneBook){
    return res.status(404).send(`<h1>No Books in the record</h1>`)
  }
  res.redirect("/showbooks");
});

module.exports = router;
