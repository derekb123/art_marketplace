import express from 'express';
const router = express.Router();

const usersRoutes = function (router: any, controller: any) {

  // const getAllUsersRoute = router.get('/users', getAllUsers);
  router.get('/users', (req: any, res: any) => {

    return controller
      .getAllUsers()
      .then((data: any) => {
        console.log(typeof data)
        res.json(data);
      });
  });

  router.get('uers/:user_id', (req: any, res: any) => {

    return controller
      .getUserById([req.params.user_id])
      .then((data: any) => {
        console.log(typeof data)
        res.json(data);
      });
  });

  return router;
}

export default  usersRoutes;