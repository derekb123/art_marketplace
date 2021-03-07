import {pool} from "../library/db-pool";
const { getAllAssetsQuery, getAssetByIdQuery } = require("../library/asset-queries");


const assetsController = {
// GET all  assets with limit, order by most recent
getAllAssets : function(limit:number): Promise<any> {
  const queryParams:number[] = [limit];

  return pool
    .query(getAllAssetsQuery, queryParams)
    .then((res: any) => {
      return res.rows;
    })
    .catch((err: Error) => {
      console.log(err);
    });
},

// GET single asset by Id
getAssetById : function(assetId:number[]): Promise<any> {
  const queryParams:number[] = assetId;

  return pool
    .query(getAssetByIdQuery, queryParams)
    .then((res: any) => {
      return res.rows;
    })
    .catch((err: Error) => {
      console.log(err);
    });
}

}

export default assetsController;