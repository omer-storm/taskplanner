const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");

const { Book } = require("../models/index");

const { protect } = require("../middleware/authMiddleware");

// @desc    Get books
// @route   POST /api/books
// @access  Private

router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const books = await Book.find({ user: req.user._id, archive: false });
    res.status(200).json(books);
  })
);

// @desc    Get archived books
// @route   POST /api/books/archive
// @access  Private

router.get(
  "/archive/",
  protect,
  asyncHandler(async (req, res) => {
    const books = await Book.find({ user: req.user._id, archive: true });
    res.status(200).json(books);
  })
);

// @desc    Set movie
// @route   POST /api/books
// @access  Private

router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    if (!req.body.name) {
      res.status(400);
      throw new Error("Please add a name field");
    }

    const book = await Book.create({
      name: req.body.name,
      user: req.user._id,
    });

    res.status(200).json(book);
  })
);

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(400);
      throw new Error("book not found");
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the book user
    if (book.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await book.remove();

    res.status(200).json({ _id: req.params.id });
  })
);

// @desc    put book
// @route   put /api/books/:id
// @access  Private
router.patch(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    let book = await Book.findById(req.params.id);

    if (!book) {
      res.status(400);
      throw new Error("book not found");
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the book user
    if (book.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized");
    }

    delete req.body._id;
    await Book.findOneAndUpdate({ _id: req.params.id }, req.body);

    res.status(200).json({ _id: book._id });
  })
);

module.exports = router;
