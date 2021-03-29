import express from 'express';
const router = express.Router();

const assetsRoutes = function(router: any, controller: any) {

  router.get('/assets/:asset_id', (req: any, res: any) => {
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