const usersQueries = {

  getAllUsersQuery:

    `SELECT *
    FROM users`,

  getUserByIdQuery:

    `SELECT *
    FROM users
    WHERE id = $1`,

  getUserByEmailQuery:

    `SELECT *
    FROM users
    WHERE email = $1`

}



export default usersQueries;