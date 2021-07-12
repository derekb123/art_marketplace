// web server config
// const resourceLimits = require('worker_threads');
import express from 'express';
require('dotenv').config();
const app = express();
const router = express.Router();
import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';
import multer from 'multer';
import morgan from 'morgan';
import bodyParser from "body-parser";

import usersController from './controllers/users-controller';
import usersRoutes from './routes/users-routes';
import assetsRoutes from './routes/assets-routes';
import assetsController from "./controllers/assets-controller";
// import mediaRoutes from './routes/media-routes';
import mediaController from "./controllers/media-controller";
import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import bcrypt from 'bcrypt';
// import methodOverride from 'method-override';



app.use(function (req: any, res: any, next: any) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

//load .env data into process.env
require('dotenv').config();

//middleware
app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// s3 abstracts function to upload a file returning a promise
// const uploadFile = (buffer, name, type) => {
//   const params = {
//     ACL: 'public-read',
//     Body: buffer,
//     Bucket: process.env.S3_BUCKET,
//     ContentType: type.mime,
//     Key: `${name}.${type.ext}`,
//   };
//   return S3.upload(params).promise();
// };

// users endpoints
const usersRouter = express.Router();
usersRoutes(usersRouter, usersController);
app.use('/users', usersRouter);

// assets endpoints
const assetsRouter = express.Router();
assetsRoutes(assetsRouter, assetsController);
app.use('/assets', assetsRouter);

// s3 endpoints
// const mediaRouter = express.Router();
// mediaRoutes(mediaRouter);
// app.use('/media', mediaRouter);


app.get('/', (req: any, res: any) => {
  res.json('Hello world!');
 });

export = app;