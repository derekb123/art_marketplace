import express from 'express';
const router = express.Router();
import axios from 'axios';
const fs = require('fs')
import multer from 'multer';
import AWS from 'aws-sdk';
const Stream = require('stream')
import chalk from 'chalk';

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
    // console.log(req);
    const assetId = req.params.asset_id

    try {
      const recievedAsset = await controller.getAssetById(assetId);
      // console.log('recievedAsset: ', recievedAsset);
      res.send(recievedAsset);
    } catch (error) {
        res.json({ error: error.message });
    }
  });

  //GET SINGLE ASSET IMAGE BY ID

  router.get('/:asset_id/image/:image_key', async (req: any, res: any) => {
    const assetImageKey = req.params.image_key;
    // console.log('imageKey in GET SINGLE ASSET IMAGE', assetImageKey);
    const assetMediaUrl = await controller.getAssetMediaUrl(assetImageKey);
    const assetMediaRes = await controller.downloadAssetMedia(assetMediaUrl);
  
    // const readStream = await controller.getFileStream(assetImageKey);
    // const convertedStream = readStream.on('readable', () => { return readStream.read() })
    // console.log(chalk.blue('CONVERTEDSTREAM'),convertedStream);
    // assetMediaRes.pipe(res);
    res.send(assetMediaUrl);
  });

   //GET ALL ASSETS

  router.get('/', async (req: any, res: any) => {
    const limit = 10;
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

  router.get('/owners/:owner_id', async (req: any, res: any) => {
    const ownerId = req.params.owner_id;
    const limit = 10;
    try {
      const assetArrayRes = await controller.getAssetsByOwnerId(ownerId, limit);
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

  //GET BIDS BY OWNER ID

  router.get('/owners/:owner_id', async (req: any, res: any) => {
    const ownerId = req.params.owner_id;
    const limit = 10;
    try {
      const assetArrayRes = await controller.getAssetsByOwnerId(ownerId, limit);
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

  //POST NEW ASSET
  const upload = multer();
  router.post('/', upload.single('file'), async (req: any, res: any, next) => {
    const recievedFile = req.file;
    // console.log('recievedFile', recievedFile)
    const title = req.body.title;
    const description = req.body.description;
    const creatorId = req.body.creatorId;
    const price = req.body.price;
    // console.log('creatorID in POST ASSETS', creatorId);

    try {
      // const imageURL = await controller.uploadAssetMedia(recievedFile).location;
      const imageKey = await controller.uploadAssetMedia(recievedFile);
      // console.log('imageKey: ', imageKey);
      return controller
        .createNewAsset(title, description, imageKey, creatorId, price)
        .then((data: any) => {
        res.json(data);
      })
    } catch (error) {
      console.log(`Error in POST NEW ASSET in ASSETS-ROUTES: ${error}`);
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