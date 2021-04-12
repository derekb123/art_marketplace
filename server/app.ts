// web server config
// const resourceLimits = require('worker_threads');
import express from 'express';
require('dotenv').config();
const app = express();
const router = express.Router();
import jwt from 'jsonwebtoken';


import morgan from 'morgan';
import bodyParser from "body-parser";
import usersController from './controllers/users-controller';
import usersRoutes from './routes/users-routes';
import assetsRoutes from './routes/assets-routes';
import assetsController from "./controllers/assets-controller";
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

const authenticateToken = (req, res, next) => {

  try {
    const jwtToken = req.header('token')

    if(!jwtToken){
      return res.status(403).json("Not Authorized.")
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = payload.user;

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorized.")
  }
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  // if (token === null) return res.sendStatus(401);

  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
  //   if (err) return res.sendStatus(403)
  //   req.user = user
  //   next()
  // })
}


// app.use(cookieSession({
//   name: null,
//   keys: [process.env.COOKIE_SECRET_01, process.env.COOKIE_SECRET_02]
// }))

// app.use(session({
//   secret: process.env.SESSION_SECRET_01,
//   saveUninitialized: true,
//   resave: false,
//   cookie: {
//     httpOnly: true,
//     maxAge: parseInt(process.env.SESSION_MAX_AGE)
//   }
// }));

// app.use((req, res, next) => {
//   console.log(req.session);
//   next();
// });

// users endpoints
const usersRouter = express.Router();
usersRoutes(usersRouter, usersController);
app.use('/users', usersRouter);

// assets endpoints
const assetsRouter = express.Router();
assetsRoutes(assetsRouter, assetsController);
app.use('/assets', assetsRouter);

app.get('/', (req: any, res: any) => {
  res.json('Hello world!');
 });

export = app;