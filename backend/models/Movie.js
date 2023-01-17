const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
  },
  date: { type: Date, default: Date.now },
  archive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
