import { AlexaForBusiness } from 'aws-sdk';
import express from 'express';
const router = express.Router();
import axios from 'axios';
const fs = require('fs')
import multer from 'multer';

const assetsRoutes = function(router: any, controller: any) {

  router.get('/images',(req: any, res: any) => {
    return controller

  })

  router.get('/:asset_id', (req: any, res: any) => {
    console.log(req);
    return controller
      .getAssetById([req.params.asset_id])
      .then((data: any) => {
        res.json(data);
      });
  });

  router.get('/', (req: any, res: any) => {
    return controller
      .getAllAssets(10)
      .then((data: any) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  const upload = multer();
  router.post('/', upload.single('file'), (req: any, res: any, next) => {
    const recievedImageFile = req.file
    const recievedImageFilename = req.body.name
    // axios.post('https://httpbin.org/anything', recievedImageFile)
    //   .then(res => console.log('response from httpbin imageFile post',res))
    //   .catch(err => console.log(err))

    return controller
      .createNewAsset(req, res)
    res.sendStatus(200)

  });

  return router;
}

export default  assetsRoutes;