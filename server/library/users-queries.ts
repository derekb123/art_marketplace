const usersQueries = {

  getAllUsersQuery:

    `SELECT *
    FROM users`,

  getUserByIdQuery:

    `SELECT *
    FROM users
    WHERE id = $1`,

  getUserIdByUsernameQuery:

  `SELECT username, id
  FROM users
  WHERE username LIKE $1`,

  getUserByEmailAndPasswordQuery:

    `SELECT *
    FROM users
    WHERE email = $1
    AND user_password =$2`,

  getUserByEmailQuery:

    `SELECT *
    FROM users
    WHERE email = $1`,
  
  getMinUserByEmailQuery:

    `SELECT username, creator, avatar
    FROM users
    WHERE email = $1`,

  createNewUserQuery:

    `INSERT INTO users (email, user_password, username)
    VALUES ($1, $2, $3)
    RETURNING *`,

  incrementRefreshTokenVersionQuery:

  `UPDATE users
    SET token_version = token_version + 1
    WHERE id = $1`

}



export default usersQueries;