import express from 'express';
const router = express.Router();
// import { Router } from 'express';
import {getAllUsers} from '../controllers/users-controller';

  const getAllUsersRoute = router.get('/users', getAllUsers);

  export default getAllUsersRoute