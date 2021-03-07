// import { Router } from "express";

const express = require('express');
const router = express.Router();
const getAllAssets = require('../controllers/assets-controller');
const getAssetById = require('../controllers/assets-controller');

module.exports = function (router: any, controller: any) {

  const getAssetByIdRoute = router.get('/:asset_id', (req: any, res: any) => {
    console.log(req.params.asset_id)
    return controller
      .getAssetById([req.params.asset_id])
      .then((data: any) => {
        res.json(data);
      });
  });

const getAllAssetsRoute = router.get('/', (req: any, res: any) => {
  return controller
    .getAllAssets(10)
    .then((data: any) => {
      res.json(data);
    })
});

// export { getAllAssetsRoute };

return router;
}