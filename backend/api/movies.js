const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");

const { Movie } = require("../models/index");

const { protect } = require("../middleware/authMiddleware");

// @desc    Get movies
// @route   POST /api/movies
// @access  Private

router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const movies = await Movie.find({ user: req.user._id, archive: false });

    res.status(200).json(movies);
  })
);

// @desc    Get movies
// @route   POST /api/movies/archive
// @access  Private

router.get(
  "/archive/",
  protect,
  asyncHandler(async (req, res) => {
    const movies = await Movie.find({ user: req.user._id, archive: true });

    res.status(200).json(movies);
  })
);



// @desc    Set movie
// @route   POST /api/movies
// @access  Private

router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    if (!req.body.name) {
      res.status(400);
      throw new Error("Please add a text field");
    }

    const movie = await Movie.create({
      name: req.body.name,
      user: req.user._id,
    });

    res.status(200).json(movie);
  })
);

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      res.status(400);
      throw new Error("movie not found");
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the movie user
    if (movie.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await movie.remove();

    res.status(200).json({ _id: req.params.id });
  })
);

// @desc    put movie
// @route   put /api/movies/:id
// @access  Private
router.patch(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
      res.status(400);
      throw new Error("movie not found");
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the movie user
    if (movie.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized");
    }

    delete req.body._id;
    await Movie.findOneAndUpdate({ _id: req.params.id }, req.body);

    res.status(200).json({ _id: movie._id });
  })
);

module.exports = router;
