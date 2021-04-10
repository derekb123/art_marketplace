import express from 'express';
const router = express.Router();

const usersRoutes = function (router: any, controller: any) {

  // GET_ALL_USERS
  router.get('/users', (req: any, res: any) => {

    return controller
      .getAllUsers()
      .then((data: any) => {
        console.log(typeof data)
        res.json(data);
      });
  });

  // GET_USER_BY_ID
  router.get('uers/:user_id', (req: any, res: any) => {

    return controller
      .getUserById([req.params.user_id])
      .then((data: any) => {
        console.log(typeof data)
        res.json(data);
      });
  });

   // USER_LOGIN
  router.post('/login', (req: any, res: any) => {
    console.log('login req.body: ',req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password)){
      return res.status(400).json( { message: 'Email and password required'})
    } else {
        return controller
        .getUserByEmail(email, password)
        .then((data) => {
          console.log(data);
          if (data.email === email && data.password === password) {
            req.session.user_id = data.user_id;
            req.session.isLoggedIn = true;
            res.json({
              userMin: data,
              loggedIn: true
            });
          }
        })
    }

    
  })

  return router;
}

export default  usersRoutes;