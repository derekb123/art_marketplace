import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import { pool } from '../library/db-pool';
import bcrypt from 'bcrypt';
import {jwtAccessTokenGenerator, jwtRefreshTokenGenerator} from '../utils/jwtGenerator'
import { body, header, validationResult } from 'express-validator';
import authenticateToken from '../middleware/authorization';
import fetch from 'node-fetch';
require('dotenv').config();
import cookieParser from 'cookie-parser';
import {sendRefreshToken} from '../utils/sendRefreshToken'


const usersRoutes = function (router: any, controller: any) {

        //VERIFY JWT REFRESH TOKEN
        router.post('/refresh', async (req, res) => {
          const refreshToken = req.cookies.rToken
          console.log('rToken from req.cookies inside /refresh',refreshToken);
          if (!refreshToken) {
            return res.send({refresh: false, accessToken:''})
          }
          let payload = null;
          try {
            payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
          } catch (error) {
            console.log(error)
            return res.send({refresh: false, accessToken:''})
          }

          //refreshToken is valid and can send back an access token
          const userId = payload.user;
          const user = await controller.getUserById(userId);
          console.log(user);

          if(!user) {
            return res.send({refresh: false, accessToken:''});
          }

          const tokenVersion = payload.tokenVersion;
          if(user.tokenVersion !== tokenVersion){
            // sendRefreshToken(res, jwtRefreshTokenGenerator(user));
            return res.send({refresh: true, accessToken: jwtAccessTokenGenerator(user)});
          }
        })

        //REVOKE REFRESH TOKENS FOR USER
        router.post('/revoke', async (req, res) => {
          
        }
        )

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
      const userId = userFull[0].id;
      const accessToken = jwtAccessTokenGenerator(userId);
      const refreshToken = jwtRefreshTokenGenerator(userId);
      const username = userFull[0].username;
      const avatar = userFull[0].avatar;
      const isCreator = userFull[0].creator;
      console.log('username', username);
      const loginSuccess = userId ? true : false;
      
      if(loginSuccess) {
        // res.cookie('rToken', refreshToken, {
        //   httpOnly: true,
        //   path: '/login'
        // });
        sendRefreshToken(res, refreshToken);
        res.json({ accessToken, username, avatar, isCreator, loginSuccess })
      }
    } catch (err) {
      console.error('error in login route', err.message)
    }

    });

    //USER REGISTRATION
    router.post(
      '/register', 
      body('email').isEmail().withMessage('Email must contain a valid email address.'), 
      body('password').isLength({ min: 2 }).withMessage('Password must be at least 8 characters long.'), 
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


    //VERIFY JWT ACCESS TOKEN
  router.get('/verify', async (req, res)=> {
    console.log('inside verify route')
    const jwtToken = req.header('token')
    if(!jwtToken){
      return res.json(false);
    }
    try {
      const verifiedUser = jwt.verify(jwtToken, process.env.JWT_SECRET);
      console.log('verify after authorization', verifiedUser);
      const verifiedUserId = verifiedUser.user[0].id
      console.log(verifiedUserId);
      if (verifiedUserId) {
        res.json(true);
      }
    } catch (err) {
      console.error(err.message);
      return res.json(false);
    }
  });



  // GET_USER_BY_ID
  router.get('/:user_id', (req: any, res: any) => {

    return controller
      .getUserById([req.params.user_id])
      .then((data: any) => {
        console.log(typeof data)
        res.json(data);
      })
      .catch((error) => {
        console.log('GET USER BY ID ERROR',error)
      })
  });

  // GET_ALL_USERS
  router.get('/', (req: any, res: any) => {

    return controller
      .getAllUsers()
      .then((data: any) => {
        console.log(typeof data)
        res.json(data);
      })
      .catch((error) => {
        console.log(error)
      })
  });

  return router;
}



export default  usersRoutes;