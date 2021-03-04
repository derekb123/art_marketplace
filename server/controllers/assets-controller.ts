const assetsPool = require("../library/db-pool");
const { getAllAssetsQuery, getAssetByIdQuery } = require("../library/asset-queries");

// GET all  assets with limit, order by most recent
exports.getAllAssets = function(limit:number): Promise<any> {
  const queryParams:number[] = [limit];

  return assetsPool
    .query(getAllAssetsQuery, queryParams)
    .then((res: any) => {
      return res.rows;
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

// exports.getAllAssets = getAllAssets

// GET one asset by Id
exports.getAssetById = function(assetId:number[]): Promise<any> {
  const queryParams:number[] = assetId;

  return assetsPool
    .query(getAssetByIdQuery, queryParams)
    .then((res: any) => {
      return res.rows;
    })
    .catch((err: Error) => {
      console.log(err);
    });
};