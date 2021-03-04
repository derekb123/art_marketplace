

exports.getAllAssetsQuery =
  `SELECT *
  FROM assets
  ORDER BY created_at DESC
  LIMIT $1;`;


exports.getAllAssetsQueryByTag =
  `SELECT *
  FROM assets
  WHERE 
  ORDER BY created_at DESC
  LIMIT $1;`;


exports.getAssetByIdQuery =

  `SELECT *
  FROM assets
  WHERE id = $1`;


exports.getAllAssetsQueryBySearch =

  `SELECT *
  FROM assets
  WHERE
  ORDER BY created_at DESC
  LIMIT $1;`;
