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

  //POST NEW ASSET
  const upload = multer();
  router.post('/', upload.single('file'), async (req: any, res: any, next) => {
    const recievedFile = req.file;
    // console.log('recievedFile', recievedFile)
    const title = req.body.title;
    const description = req.body.description;
    const creatorId = req.body.creatorId;
    const price = req.body.price;
    console.log('creatorID in POST ASSETS', creatorId);

    try {
      const imageURL = await controller.uploadAssetMedia(recievedFile);
      return controller
        .createNewAsset(title, description, imageURL, creatorId, price)
        .then((data: any) => {
        res.json(data);
      })
    } catch (error) {
      console.log(`Create error: ${error}`);
    }

    


    // controller
    //   .storeImageUpload(recievedFile)
    //   .then((imageURL) => {
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   })
  });

  return router;
}

export default  assetsRoutes;