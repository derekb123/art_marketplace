const getAllUsersQuery: string =
  `SELECT *
  FROM users`;

export { getAllUsersQuery} ;

const getUserByIdQuery: string =

  `SELECT *
  FROM users
  WHERE id = $1`;

export { getUserByIdQuery };