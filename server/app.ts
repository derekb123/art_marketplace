// web server config
import express from 'express';
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const router = express.Router();
import  getAllUsersRoute  from './routes/users-routes'

//load .env data into process.env
require('dotenv').config();

// import { restart } from 'nodemon';

// app.use((error, req, res, next) => {
//   restart.status(500).json({message: error.message})
// });


//middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(getAllUsersRoute);

app.get('/', (req, res) => {
  res.json('Hello world!');
 });

export = app;