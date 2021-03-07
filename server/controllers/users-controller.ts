// import { pool } from "../library/db-pool"
const usersPool = require("../library/db-pool");
const { getAllUsersQuery } = require("../library/users-queries");

//get all users

export const getAllUsers = function(): Promise<any> {
  return usersPool
    .query(getAllUsersQuery)
    .then((res: any) => {
      console.log(res.rows);
      return res.rows;
    });
};

// export {getAllUsers};