import express from 'express';
const router = express.Router();

const assetsRoutes = function(router: any, controller: any) {

  router.get('/:asset_id', (req: any, res: any) => {
    console.log(req.params);
    return controller
      .getAssetById([req.params])
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
    .catch((err) => {
      res.json({ error: err.message });
    });
});

return router;
}

export default  assetsRoutes;