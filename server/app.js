// web server config
const express = require('express');
const { restart } = require('nodemon');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");

app.use((error, req, res, next) => {
  restart.status(500).json({message: error.message})
});

//middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json);

module.exports = app;