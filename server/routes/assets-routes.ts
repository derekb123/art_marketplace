// import { Router } from "express";

const express = require('express');
const router = express.Router();
const getAllAssets = require('../controllers/assets-controller');
const getAssetById = require('../controllers/assets-controller');

module.exports = function (router: any, controller: any) {

const getAllAssetsRoute = router.get('/', (req: any, res: any) => {
  return controller
    .getAllAssets(10)
    .then((data: any) => {
      res.json(data);
    })
});

// export { getAllAssetsRoute };

const getAssetByIdRoute = router.get('/:id', (req: any, res: any) => {
  console.log(req.params)
  return controller
    .getAssetById(req.params)
    .then((data: any) => {
      res.json(data);
    });
});

return router;
}