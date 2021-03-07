import { pool }  from "../library/db-pool";
import usersQueries from "../library/users-queries";

const assetsController = {

//get all users
getAllUsers : function(): Promise<any> {
  return pool
    .query(usersQueries.getAllUsersQuery)
    .then((res: any) => {
      console.log(res.rows);
      return res.rows;
    });
},

getUserById : function(userId: number[]): Promise<any> {
  const queryParams:number[] = userId;

  return pool
    .query(usersQueries.getUserByIdQuery, queryParams)
    .then((res: any) => {
      console.log(res.rows);
      return res.rows;
    });
}

}

export default assetsController;