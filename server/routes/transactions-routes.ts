import express from 'express';
const router = express.Router();
import axios from 'axios';
const fs = require('fs')
import AWS from 'aws-sdk';
const Stream = require('stream')

const bucketName = process.env.S3_BUCKET
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_DEV_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_DEV_ACCESS_SECRET_KEY

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey
});

const transactionsRoutes = function(router: any, controller: any) {

  //GET SINGLE TRANSACTION BY ID

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

  //GET TRANSACTION BY SELLER ID

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

  //GET TRANSACTION BY PURCHASER ID

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

  //POST NEW TRANSACTION
  router.post('/', async (req: any, res: any, next) => {

    const asset_id = req.body.asset_id;
    const buyer_id = req.body.buyer_id;
    const seller_id = req.body.seller_id;
    const creator_id = req.body.creator_id;
    const payment_method = req.body.payment_method;
    const sale_price = req.body.sale_price;

    try {
      return controller
        .createNewTransaction(asset_id, buyer_id, seller_id, creator_id, payment_method, sale_price)
        .then((data: any) => {
        res.json(data);
      })
    } catch (error) {
      console.log(`Error in POST NEW ASSET in ASSETS-ROUTES: ${error}`);
    }
  });

  return router;
}

export default  transactionsRoutes;