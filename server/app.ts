// web server config
import express from 'express';
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const router = express.Router();
import  getAllUsersRoute  from './routes/users-routes'
import  getAllAssetsBaseRoute  from './routes/assets-routes'

//load .env data into process.env
require('dotenv').config();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(router, getAllUsersRoute);
app.use(router, getAllAssetsBaseRoute);

app.get('/', (req, res) => {
  res.json('Hello world!');
 });

export = app;