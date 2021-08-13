const assetsQueries = {

getAllAssetsQuery:

  `SELECT *
  FROM assets
  ORDER BY created_at DESC
  LIMIT $1;`,

getAssetByIdQuery:

  `SELECT *
  FROM assets
  WHERE id = $1`,

getAssetsByOwnerIdQuery:

  `SELECT *
  FROM assets
  WHERE owner_id = $1`,

getAllAssetsQueryByTag:

  `SELECT *
  FROM assets
  JOIN asset_tags ON assets.id = asset_id
  WHERE tag_id = $1
  ORDER BY created_at DESC
  LIMIT $2;`,

getAllAssetsQueryBySearch:

  `SELECT *
  FROM assets
  WHERE
  ORDER BY created_at DESC
  LIMIT $1;`,

createNewAssetQuery:

  `INSERT INTO
  assets (
    title,
    asset_description,
    asset_media,
    creator_id,
    owner_id,
    list_price
    )
    values ($1, $2, $3, $4, $5, $6)
 `
}

export default assetsQueries;