const getAllAssetsQuery: string =
  `SELECT *
  FROM asset_base
  LIMIT $1`;

export { getAllAssetsQuery} ;