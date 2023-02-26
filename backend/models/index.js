const mongoose = require("mongoose");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
})();


module.exports = {
  User: require("./User"),
  Movie: require("./Movie"),
  Book: require("./Book"),
};
