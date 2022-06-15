const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes/index.route");
const errorHandler = require("./errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("tiny"));

app.use(routes);
app.use(errorHandler);

module.exports = app;
