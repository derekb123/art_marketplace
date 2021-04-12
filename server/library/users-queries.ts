const usersQueries = {

  getAllUsersQuery:

    `SELECT *
    FROM users`,

  getUserByIdQuery:

    `SELECT *
    FROM users
    WHERE id = $1`,

  getUserByEmailAndPasswordQuery:

    `SELECT *
    FROM users
    WHERE email = $1
    AND user_password =$2`,

  getUserByEmailQuery:

    `SELECT *
    FROM users
    WHERE email = $1`,

  createNewUserQuery:

    `INSERT INTO users (email, user_password, username)
    VALUES ($1, $2, $3)
    RETURNING *`

}



export default usersQueries;