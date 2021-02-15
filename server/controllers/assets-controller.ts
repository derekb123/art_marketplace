import { pool } from "../library/db-pool"
// const pool = require("../library/db-pool");
import { getAllAssetsQuery } from "../library/asset-queries"

// GET all base assets with limit, order by most recent
const getAllAssetsBase = function(limit:number): Promise<any> {
  const queryParams:number[] = [limit];

  return pool
    .query(getAllAssetsQuery, queryParams)
    .then((res: any) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

export {getAllAssetsBase};