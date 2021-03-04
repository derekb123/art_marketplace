

module.exports.getAllAssetsQuery =
  `SELECT *
  FROM assets
  ORDER BY created_at DESC
  LIMIT $1;`;


module.exports.getAllAssetsQueryByTag =
  `SELECT *
  FROM assets
  WHERE 
  ORDER BY created_at DESC
  LIMIT $1;`;


module.exports.getAssetByIdQuery =

  `SELECT *
  FROM assets
  WHERE id = $1`;


module.exports.getAllAssetsQueryBySearch =

  `SELECT *
  FROM assets
  WHERE
  ORDER BY created_at DESC
  LIMIT $1;`;
