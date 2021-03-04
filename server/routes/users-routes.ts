import express from 'express';
const router = express.Router();
// import { Router } from 'express';
const {getAllUsers} = require('../controllers/users-controller');

module.exports = function (router: any, controller: any) {

  // const getAllUsersRoute = router.get('/users', getAllUsers);
  router.get('/users', (req: any, res: any) => {
    console.log(getAllUsers());
    return controller
      .getAllUsers()
      .then((data: any) => {
        console.log(typeof data)
        res.json(data);
      });
  });

  return router;
}