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

  return router
}

export default bidsRoutes;