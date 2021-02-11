import { pool } from "../library/db-pool"
// const pool = require("../library/db-pool");
import { getAllNftsQuery } from "../library/nft-queries"

//get all users

const getAllNfts = function(): Promise<any> {
  return pool
    .query(getAllNftsQuery)
    .then((res: any) => {
      console.log(res.rows);
      return res.rows;
    });
};

export {getAllNfts};