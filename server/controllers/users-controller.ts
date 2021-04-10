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
},

getUserByEmail : function(userEmail: any, userPassword: any): Promise<any> {
  const queryParams:any = [userEmail, userPassword];

  return pool
    .query(usersQueries.getUserByEmailQuery, queryParams)
    .then((res: any) => {
      if (res.password === userPassword)
      console.log(res.rows);
      return res.rows;
    });
}

}

export default assetsController;