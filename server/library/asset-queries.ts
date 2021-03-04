

const getAllAssetsQuery: string =
  `SELECT *
  FROM assets
  ORDER BY created_at DESC
  LIMIT $1;`;

export { getAllAssetsQuery };

const getAllAssetsQueryByTag: string =
  `SELECT *
  FROM assets
  WHERE 
  ORDER BY created_at DESC
  LIMIT $1;`;

export { getAllAssetsQueryByTag };

const getAssetByIdQuery: string =

  `SELECT *
  FROM assets
  WHERE id = $1`;

export { getAssetByIdQuery };

const getAllAssetsQueryBySearch: string =

  `SELECT *
  FROM assets
  WHERE
  ORDER BY created_at DESC
  LIMIT $1;`;

export { getAllAssetsQueryBySearch };