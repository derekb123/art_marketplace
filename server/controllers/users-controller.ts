const pool = require("./db");
import { getAllUsersQuery } from "../library/users-queries"

//get all users

const getAllUsers = function async (limit: number): Promise<any> {
  return pool
    .query(getAllUsersQuery)
    .then((res) => {
      console.log(typeof res);
      return res.rows;
    });
};

export {getAllUsers};