import express from 'express';
const router = express.Router();

const assetsRoutes = function(router: any, controller: any) {

  router.get('/images',(req: any, res: any) => {
    return controller

  })

  router.get('/:asset_id', (req: any, res: any) => {
    console.log(req);
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
      .catch((err) => {
        res.json({ error: err.message });
      });
  });
  
  router.post('/', (req: any, res: any) => {
    console.log('Create Asset Route Post to / req.body',req.body);
  });

  return router;
}

export default  assetsRoutes;