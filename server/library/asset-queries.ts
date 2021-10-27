const assetsQueries = {

getAllAssetsQuery:

  `SELECT *
  FROM assets
  ORDER BY created_at DESC
  LIMIT $1;`,

getAssetByIdQuery:

  `SELECT assets.*, users.username AS creator_name, users.avatar
  FROM assets
  JOIN users ON assets.creator_id = users.id 
  WHERE assets.id = $1`,

getAssetsByOwnerIdQuery:

  `SELECT *
  FROM assets
  WHERE owner_id = $1
  LIMIT $2;`,

getAssetsByCreatorIdQuery:

  `SELECT *
  FROM assets
  WHERE creator_id = $1
  LIMIT $2;`,

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
    RETURNING *;
 `,

transferAssetQuery:
`UPDATE assets
SET owner_id=$1, list_price=0
WHERE id=$2
`,

editAssetPriceQuery:
`UPDATE assets
SET list_price=$1
WHERE id=$2
`,

}

export default assetsQueries;