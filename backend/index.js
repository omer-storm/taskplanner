const express = require("express");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/users", require("./api/users"));
app.use("/api/books", require("./api/books"));
app.use("/api/movies", require("./api/movies"));

 
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
