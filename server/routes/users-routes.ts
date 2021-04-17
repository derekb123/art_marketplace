import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import { pool } from '../library/db-pool';
import bcrypt from 'bcrypt';
import jwtGenerator from '../utils/jwtGenerator'
import { body, validationResult } from 'express-validator';
import authenticateToken from '../middleware/authorization';
require('dotenv').config();

const usersRoutes = function (router: any, controller: any) {





   // USER_LOGIN
  router.post(
    '/login', 
    body('email').isEmail(), 
    body('password').exists({checkFalsy:true}),  
    async (req: any, res: any) => {
    try {
      //Validate req is acceptable then destructure req

      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
      }

      const {email , password} = req.body;

      //Check if user doesn't exist (if not throw error)

      const user= await controller.getUserByEmail(email);
      console.log('user from getuserbyemail in login', user)
      if (user.length === 0){
        return res.status(401).json('Password or Email is incorrect.');
      }

      //Check if incoming password is the same as the database password

      const validPassword = await bcrypt.compare(password, user[0].user_password)
      console.log('bcrypt compare validPassword', validPassword);
      if(!validPassword){
        return res.status(401).json('Password or Email is incorrect.');
      }

      //Provide jwt token
      console.log('user', user);
      const token = jwtGenerator(user[0].id);
      const username = user[0].username
      console.log('username', username);

      res.json({ token, username });
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
        console.log('register req.body:', req.body);
        const { email, password, username } = req.body;
        console.log(email, password, username)

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


        //Enter the new user inside database

        const newUser = await controller.createNewUser(email, bcryptPassword, username);

        //Generate and pass jwt token
        
        const token = jwtGenerator(newUser.rows[0].id);
        console.log('users routes token: ',token)
        res.json({token});

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });

    //Verify JWT Token
  router.get('/verify', authenticateToken, async (req, res)=> {
    try {
      console.log(req);
      res.json(req);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
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