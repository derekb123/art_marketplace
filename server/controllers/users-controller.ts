import { pool }  from "../library/db-pool";
import usersQueries from "../library/users-queries";

const usersController = {


getAllUsers : function(): Promise<any> {
  return pool
    .query(usersQueries.getAllUsersQuery)
    .then((res: any) => {
      return res.rows;
    });
},

getAllCreators : function(): Promise<any> {
  return pool
    .query(usersQueries.getAllCreatorsQuery)
    .then((res: any) => {
      return res.rows;
    });
},

getUserById : function(userId: number): Promise<any> {
  const queryParams:number[] = [userId];

  return pool
    .query(usersQueries.getUserByIdQuery, queryParams)
    .then((res: any) => {
      return res.rows;
    });
},

getUserIdByUsername : function(username: string): Promise<any> {
  const queryParams:string[] = [username];

  return pool
    .query(usersQueries.getUserIdByUsernameQuery, queryParams)
    .then((res: any) => {
      return res.rows;
    });
},

getUserByEmailAndPassword : function(userEmail: any, userPassword: any): Promise<any> {
  const queryParams:any = [userEmail, userPassword];

  return pool
    .query(usersQueries.getUserByEmailAndPasswordQuery, queryParams)
    .then((res: any) => {
      if (res.password === userPassword)
      return res.rows;
    });
},

getUserByEmail : function(userEmail: any): Promise<any> {
  const queryParams:any = [userEmail];

  return pool
    .query(usersQueries.getUserByEmailQuery, queryParams)
    .then((res: any) => {
      return res.rows;
    });
},

getMinUserByEmail : function(userEmail: any): Promise<any> {
  const queryParams:any = [userEmail];

  return pool
    .query(usersQueries.getMinUserByEmailQuery, queryParams)
    .then((res: any) => {
      return res.rows;
    });
},

setUserToCreator : function(user_id: any): Promise<any> {
  const queryParams:any = [user_id];

  return pool
    .query(usersQueries.setUserToCreatorQuery, queryParams)
    .then((res: any) => {
      return res.rows;
    });
},

createNewUser : function(userEmail: any, hashedPassword: any, userName: any): Promise<any> {
  const queryParams:any = [userEmail, hashedPassword, userName];

  return pool
    .query(usersQueries.createNewUserQuery, queryParams)
},

incrementRefreshTokenVersion : function(userId: any): Promise<any> {
  const queryParams:any = [userId];
  return pool
    .query(usersQueries.incrementRefreshTokenVersionQuery, queryParams)
},

}

export default usersController;