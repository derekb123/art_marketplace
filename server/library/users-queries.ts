module.exports.getAllUsersQuery =
  `SELECT *
  FROM users`;



module.exports.getUserByIdQuery =

  `SELECT *
  FROM users
  WHERE id = $1`;
