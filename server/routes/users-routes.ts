import express from 'express';
const router = express.Router();
// import { Router } from 'express';
import {getAllUsers} from '../controllers/users-controller';

  // const getAllUsersRoute = router.get('/users', getAllUsers);
  const getAllUsersRoute = router.get('/users', (req: any, res: any) => {
    console.log(getAllUsers());
    return getAllUsers()
    .then((data: any) => {
      console.log(typeof data)
      res.json(data);
    })
  });

  export default getAllUsersRoute;