import express from 'express';
const router = express.Router();
const fs = require('fs')
import multer from 'multer';
import AWS from 'aws-sdk';

const bucketName = process.env.S3_BUCKET
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_DEV_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_DEV_ACCESS_SECRET_KEY

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey
});

const assetsRoutes = function(router: any, controller: any) {

  router.get('/images',(req: any, res: any) => {
    return controller

  })

  //GET SINGLE ASSET INFO BY ID

  router.get('/:asset_id', async (req: any, res: any) => {
    const assetId = req.params.asset_id

    try {
      const recievedAsset = await controller.getAssetById(assetId);
      res.send(recievedAsset);
    } catch (error) {
        res.json({ error: error.message });
    }
  });

  //GET SINGLE ASSET INFO BY ID

  router.get('/search', async (req: any, res: any) => {
    const query = req.query

    try {
      const assetArrayRes = await controller.getAllAssets(10);
      const assetImageLoop = async () => {
        let mutatedAssetMediaArr = [];
        for (let i = 0; i < assetArrayRes.length ; i++) {
        let asset = assetArrayRes[i];
        asset.asset_media = await controller.getAssetMediaUrl(asset.asset_media);
        mutatedAssetMediaArr.push(asset);
        }
        return mutatedAssetMediaArr;
      }

      await assetImageLoop();

      res.send(assetArrayRes);
    } catch (err) {
      res.json('error inside get assetid route',{ error: err.message });
    }
  });

  //GET SINGLE ASSET IMAGE BY ID

  router.get('/:asset_id/image/:image_key', async (req: any, res: any) => {
    const assetImageKey = req.params.image_key;
    // console.log('imageKey in GET SINGLE ASSET IMAGE', assetImageKey);
    const assetMediaUrl = await controller.getAssetMediaUrl(assetImageKey);
    const assetMediaRes = await controller.downloadAssetMedia(assetMediaUrl);
  
    res.send(assetMediaUrl);
  });

   //GET ALL ASSETS

  router.get('/', async (req: any, res: any) => {
    const limit = 1000;
    try {
      const assetArrayRes = await controller.getAllAssets(limit);
      const assetImageLoop = async () => {
        let mutatedAssetMediaArr = [];
        for (let i = 0; i < assetArrayRes.length ; i++) {
        let asset = assetArrayRes[i];
        asset.asset_media = await controller.getAssetMediaUrl(asset.asset_media);
        // console.log('altered asset media',asset.asset_media);
        mutatedAssetMediaArr.push(asset);
        }
        return mutatedAssetMediaArr;
      }

      await assetImageLoop();

      res.send(assetArrayRes);
    } catch (err) {
      res.json('error inside get assetid route',{ error: err.message });
    }
  });

  //GET ASSETS BY OWNER ID

  router.get('/owners/:user_id', async (req: any, res: any) => {
    const userId = req.params.user_id;
    console.log('userId', userId);
    const limit = 100;
    try {
      const assetArrayRes = await controller.getAssetsByOwnerId(userId, limit);
      const assetImageLoop = async () => {
        let mutatedAssetMediaArr = [];
        for (let i = 0; i < assetArrayRes.length ; i++) {
        let asset = assetArrayRes[i];
        asset.asset_media = await controller.getAssetMediaUrl(asset.asset_media);
        mutatedAssetMediaArr.push(asset);
        }
        return mutatedAssetMediaArr;
      }

      await assetImageLoop();

      console.log('assetArrayRes',assetArrayRes);

      res.send(assetArrayRes);
    } catch (err) {
      // res.status(err.status).json({ error: err.message });
      res.json({ error: err.message });
    }
  });

    //GET ASSETS BY CREATOR ID

  router.get('/creators/:user_id', async (req: any, res: any) => {
    const userId = req.params.user_id;
    console.log('userId', userId);
    const limit = 100;
    try {
      const assetArrayRes = await controller.getAssetsByCreatorId(userId, limit);
      const assetImageLoop = async () => {
        let mutatedAssetMediaArr = [];
        for (let i = 0; i < assetArrayRes.length ; i++) {
        let asset = assetArrayRes[i];
        asset.asset_media = await controller.getAssetMediaUrl(asset.asset_media);
        mutatedAssetMediaArr.push(asset);
        }
        return mutatedAssetMediaArr;
      }

      await assetImageLoop();


      res.send(assetArrayRes);
    } catch (err) {
      // res.status(err.status).json({ error: err.message });
      res.json({ error: err.message });
    }
  });

  //POST NEW ASSET
  const upload = multer();
  router.post('/', upload.single('file'), async (req: any, res: any, next) => {
    const recievedFile = req.file;
    const title = req.body.title;
    const description = req.body.description;
    const creatorId = req.body.creatorId;
    const price = req.body.price;

    try {
      // const imageURL = await controller.uploadAssetMedia(recievedFile).location;
      const imageKey = await controller.uploadAssetMedia(recievedFile);
      return controller
        .createNewAsset(title, description, imageKey, creatorId, price)
        .then((data: any) => {
        res.json(data);
      })
    } catch (error) {
      console.log(`Error in POST NEW ASSET in ASSETS-ROUTES: ${error}`);
    }
  });

  //TRANSFER ASSET
  router.put('/:asset_id/transfer/:buyer_id', async (req: any, res: any, next) => {
    const buyerId = req.params.buyer_id;
    const assetId = req.params.asset_id;
    console.log('userId, assetId PUT ASSETS', buyerId, assetId );

    try {
      return controller
        .transferAsset(buyerId, assetId)
        .then((data: any) => {
        res.json(data);
      })
    } catch (error) {
      console.log(`Error in TRANSFER ASSET in ASSETS-ROUTES: ${error}`);
    }
  });

  //EDIT ASSET PRICE
  router.put('/:asset_id/price', async (req: any, res: any, next) => {
    const salePrice = req.body.salePrice;
    const assetId = req.params.asset_id;
    try {
      return controller
        .editAssetPrice(salePrice, assetId)
        .then((data: any) => {
        res.json(data);
      })
    } catch (error) {
      console.log(`Error in EDIT ASSET PRICE in ASSETS-ROUTES: ${error}`);
    }
  })

  return router;
}

export default  assetsRoutes;