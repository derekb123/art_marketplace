import express from 'express';
const router = express.Router();
// import { getAllAssets } from '../controllers/assets-controller';
// const getAssetById = require('../controllers/assets-controller');

const assetsRoutes = function(router: any, controller: any) {

  router.get('/:asset_id', (req: any, res: any) => {
    console.log(req.params.asset_id)
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
});

return router;
}

export default  assetsRoutes;