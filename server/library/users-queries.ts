const usersQueries = {

getAllUsersQuery: 

  `SELECT *
  FROM users`,

getUserByIdQuery:

  `SELECT *
  FROM users
  WHERE id = $1`

}

export default usersQueries;