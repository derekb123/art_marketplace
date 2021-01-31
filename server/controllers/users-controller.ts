import { pool } from "../library/db-pool"
// const pool = require("../library/db-pool");
import { getAllUsersQuery } from "../library/users-queries"

//get all users

const getAllUsers = function(): Promise<any> {
  console.log(pool);
  return pool
    .query(getAllUsersQuery)
    .then((res: any) => {
      // console.log(typeof res);
      return res.rows;
    });
};

export {getAllUsers};