export const getAllAssetsQuery =

  `SELECT *
  FROM assets
  ORDER BY created_at DESC
  LIMIT $1;`;

export const getAssetByIdQuery =

  `SELECT *
  FROM assets
  WHERE id = $1`;

export const getAllAssetsQueryByTag =

  `SELECT *
  FROM assets
  JOIN asset_tags ON assets.id = asset_id
  WHERE tag_id = $1
  ORDER BY created_at DESC
  LIMIT $2;`;

export const getAllAssetsQueryBySearch =

  `SELECT *
  FROM assets
  WHERE
  ORDER BY created_at DESC
  LIMIT $1;`;

