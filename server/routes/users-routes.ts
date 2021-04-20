import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import { pool } from '../library/db-pool';
import bcrypt from 'bcrypt';
import jwtGenerator from '../utils/jwtGenerator'
import { body, header, validationResult } from 'express-validator';
import authenticateToken from '../middleware/authorization';
import fetch from 'node-fetch';
require('dotenv').config();


const usersRoutes = function (router: any, controller: any) {

   // USER_LOGIN
  router.post(
    '/login',
    header('email').isEmail(),
    header('password').exists({checkFalsy:true}),
    async (req: any, res: any) => {
    try {
      //Validate req is acceptable then destructure req

      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
      }

      const {email , password} = req.headers;

      //Check if user doesn't exist (if not throw error)

      const userFull= await controller.getUserByEmail(email);
      // console.log('User from getUserbyemail in login', userFull)
      if (userFull.length === 0){
        return res.status(401).json('Password or Email is incorrect.');
      }

      //Check if incoming password is the same as the database password

      const validPassword = await bcrypt.compare(password, userFull[0].user_password)
      // console.log('bcrypt compare validPassword', validPassword);
      if(!validPassword){
        return res.status(401).json('Password or Email is incorrect.');
      }

      //Provide jwt token
      console.log('user', userFull);
      const token = jwtGenerator(userFull[0].id);
      const username = userFull[0].username;
      const avatar = userFull[0].avatar;
      const isCreator = userFull[0].creator;
      console.log('username', username);
      const loginSuccess = userFull[0].id ? true : false;

      res.json({ token, username, avatar, isCreator, loginSuccess });
    } catch (err) {
      console.error(err.message)
    }

    });

    //USER REGISTRATION
    router.post(
      '/register', 
      body('email').isEmail().withMessage('Email must contain a valid email address.'), 
      body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'), 
      body('username').exists({checkFalsy:true}), 
      async (req: any, res: any) => {

      try {
        //Validate req is acceptable then destructure req

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array() });
        }

        const { email, password, username } = req.body;

        //Check if user exists (ifuser exists, throw error)

        const existingUser = await controller.getUserByEmail(email);
        console.log(existingUser);
        if (existingUser.length !==0 ) {
          res.status(401).send('A user with that email already exists.')
        }

        //Hash user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log(bcryptPassword)

        //Create Default Avatar
        // try {
        //   const res = await fetch(
        //     `https://ui-avatars.com/api/?name=${username}&rounded=true`,{
        //       method: "GET"
        //       }
        //     )
        // } catch (error) {
        //   console.error(error.message)
        // }

        // const defaultAvatar = await res.json();
        // console.log(defaultAvatar);

        //Enter the new user inside database

        const newUser = await controller.createNewUser(email, bcryptPassword, username);

        //Generate and pass jwt token
        
        // const token = jwtGenerator(newUser.rows[0].id);
        const newUserId = (newUser.rows[0].id);
        const registerSuccess = newUserId ? true : false
        res.json(registerSuccess);

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });

    //Verify JWT Token
  router.get('/verify', async (req, res)=> {
    const jwtToken = req.header('token')
    if(!jwtToken){
      return res.json(false);
    }
    // console.log('Verify user Route')
    try {
      const verify = jwt.verify(jwtToken, process.env.JWT_SECRET);
      // console.log('verify in authorization', verify);
      console.log('verify after authorization', verify);
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.json(false);
    }
  });

  // GET_USER_BY_ID
  router.get('/:user_id', (req: any, res: any) => {

    return controller
      .getUserById([req.params.user_id])
      .then((data: any) => {
        console.log(typeof data)
        res.json(data);
      });
  });

  // GET_ALL_USERS
  router.get('/', (req: any, res: any) => {

    return controller
      .getAllUsers()
      .then((data: any) => {
        console.log(typeof data)
        res.json(data);
      });
  });

  return router;
}



export default  usersRoutes;