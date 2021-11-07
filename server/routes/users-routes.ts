import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {jwtAccessTokenGenerator, jwtRefreshTokenGenerator} from '../utils/jwtGenerator'
import { body, header, validationResult } from 'express-validator';
import {sendRefreshToken} from '../utils/sendRefreshToken';
import authenticateToken from '../middleware/authorization';
require('dotenv').config();



const usersRoutes = function (router: any, controller: any) {

        //VERIFY JWT REFRESH TOKEN
        router.post('/refresh', async (req, res) => {
          const refreshToken = req.cookies.rToken
          if (!refreshToken) {
            return res.send({refresh: false, accessToken:''})
          }
          let payload = null;
          try {
            payload = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

          } catch (error) {
            console.log(error)
            return res.send({refresh: false, accessToken:''})
          }

          //refreshToken is valid and can send back an access token
          const userId = payload.user;
          console.log('payload.user after jwt.verify', userId);
          const user = await controller.getUserById(userId);
          console.log('user after refreshToken is valid', user);

          if(!user) {
            console.log('!user')
            return res.send({refresh: false, accessToken:''});
          }

          const tokenVersion = payload.tokenVersion;
          if(user[0].token_version !== tokenVersion){
            console.log('user.tokenVersion !== tokenVersion');
            return res.send({refresh: false, accessToken:''});
          };

          return res.send({
            refresh: true, 
            accessToken: jwtAccessTokenGenerator(user), 
            username: user[0].username, 
            avatar: user[0].avatar, 
            isCreator: user[0].creator,
            userId: user[0].id
          })
        });

        //REVOKE REFRESH TOKENS FOR USER
        router.post('/revoke', async (req, res) => {
          const {userId} = req.headers;
          await controller.incrementRefreshTokenVersion(userId);
          return true;
        });

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
      if (userFull.length === 0){
        return res.status(401).json('Password or Email is incorrect.');
      }

      //Check if incoming password is the same as the database password

      const validPassword = await bcrypt.compare(password, userFull[0].user_password)
      if(!validPassword){
        return res.status(401).json('Password or Email is incorrect.');
      }

      //Provide jwt token
      const userId = userFull[0].id;
      const accessToken = jwtAccessTokenGenerator(userId);
      const refreshToken = jwtRefreshTokenGenerator(userFull[0]);
      const username = userFull[0].username;
      const avatar = userFull[0].avatar;
      const isCreator = userFull[0].creator;
      const loginSuccess = userId ? true : false;

      if(loginSuccess) {
        // res.cookie('rToken', refreshToken, {
        //   httpOnly: true,
        //   path: '/login'
        // });
        res.clearCookie('rToken');
        sendRefreshToken(res, refreshToken);
        res.json({ accessToken, username, avatar, isCreator, loginSuccess, userId })
      }
    } catch (err) {
      console.error('error in login route', err.message)
    }

    });

    //USER LOG OUT

    router.post('/logout', async (req: any, res: any) => {

      res.clearCookie('rToken');
      return res.send({ accessToken:''});
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
        if (existingUser.length !==0 ) {
          res.status(401).send('A user with that email already exists.')
        }

        //Hash user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

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
      console.log('verified User after authorization', verifiedUser);
      const verifiedUserId = verifiedUser.user[0].id
      if (verifiedUserId) {
        res.json(true);
      }
    } catch (err) {
      console.error(err.message);
      return res.json(false);
    }
  });

    // GET_USER_BY_SEARCH
  router.get('/search', (req: any, res: any) => {
    console.log('GET USER BY SEARCH params', req.query.artist)
    console.log('typeof params', typeof req.query.artist)
    return controller
      .getUserIdByUsername(`${req.query.artist}%`)
      .then((data: any) => {
        console.log(typeof data)
        res.json(data);
      })
      .catch((error) => {
        console.log('GET USER BY SEARCH ERROR',error)
      })
  });

  // GET ALL CREATORS
  router.get('/creators', (req: any, res: any) => {
    console.log('INSIDE GETALLCREATORS ROUTE')
    return controller
      .getAllCreators()
      .then((data: any) => {
        console.log('GET ALL CREATORS ROUTE RES',data)
        res.json(data);
      })
      .catch((error) => {
        console.log('GET USER BY SEARCH ERROR',error)
      })
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

  //SET CREATOR TO TRUE
  router.put('/:user_id/set-creator', (req: any, res: any, next) => {
    const userId = req.params.user_id;
    return controller
      .setUserToCreator(userId)
      .then((data: any) => {
        console.log(data)
        res.json(data);
      })
      .catch((error) => {
        console.log('GET USER BY ID ERROR',error)
      })
  })

  return router;
}



export default  usersRoutes;