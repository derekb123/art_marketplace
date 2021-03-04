// import { Router } from "express";

const express = require('express');
const router = express.Router();
const getAllAssets = require('../controllers/assets-controller');
const getAssetById = require('../controllers/assets-controller');

module.exports = function (router: any, controller: any) {

const getAllAssetsRoute = router.get('/assets', (req: any, res: any) => {
  return getAllAssets(10)
  .then((data: any) => {
    res.json(data);
  })
});

// export { getAllAssetsRoute };

const getAssetByIdRoute = router.get('/assets/:id', (req: any, res: any) => {
  return getAssetById(req.params)
  .then((data: any) => {
    res.json(data);
  })
});

return router;
}