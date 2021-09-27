import express from 'express';
const router = express.Router();
import axios from 'axios';
const fs = require('fs')
import multer from 'multer';
import AWS from 'aws-sdk';
const Stream = require('stream')
import chalk from 'chalk';

const bidsRoutes = function(router: any, controller: any) {

  router.post('/', async (req: any, res: any) => {
    console.log('INSIDE POST BIDS');
    console.log('req.body inside post bids',req.body);
    const bidder_id = req.body.bidder_id
    const asset_id = req.body.asset_id
    console.log('asset_id in bidsRoutes', asset_id)
    const bid_price = req.body.bid_price
    const postedBid = await controller.createNewBid(bidder_id, asset_id, bid_price);
    console.log('postedBid in bid-routes', postedBid);
    res.send(postedBid);
  })

  //GET BIDS BY ASSET ID

  router.get('/assets/:asset_id', async (req: any, res: any) => {
    const assetId = req.params.asset_id;
    const limit = 10;
    try {
      const bidsArrayRes = await controller.getBidsByAssetId(assetId, limit);
      const bidsImageLoop = async () => {
      let mutatedAssetMediaArr = [];
      for (let i = 0; i < bidsArrayRes.length ; i++) {
      let asset = bidsArrayRes[i];
      asset.asset_media = await controller.getAssetMediaUrl(asset.asset_media);
      // console.log('altered asset media',asset.asset_media);
      mutatedAssetMediaArr.push(asset);
      }
      return mutatedAssetMediaArr;
    }

    await bidsImageLoop();
    } catch (err) {
      res.json('error inside get get bids by asset Id route',{ error: err.message });
    }
  });

  //GET BIDS BY BIDDER ID

  // router.get('/bidders/:bidder_id', async (req: any, res: any) => {
  //   const bidderId = req.params.bidder_id;
  //   const limit = 10;
  //   try {
  //     const bidsArrayRes = await controller.getBidsRecievedByBidderId(bidderId, limit);
  //     res.send(bidsArrayRes);
  //   } catch (err) {
  //     res.json('error inside get assetid route',{ error: err.message });
  //   }
  // });
  
  return router
}

export default bidsRoutes;