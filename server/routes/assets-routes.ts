import express from 'express';
const router = express.Router();
// import { Router } from 'express';
import {getAllAssetsBase} from '../controllers/assets-controller';

  // const getAllAssetsBaseRoute = router.get('/assets', getAllAssetsBase);
  const getAllAssetsBaseRoute = router.get('/assets', (req: any, res: any) => {
    console.log(getAllAssetsBase(10));
    return getAllAssetsBase(10)
    .then((data: any) => {
      console.log(typeof data)
      res.json(data);
    })
  });

  export default getAllAssetsBaseRoute;