const bidsQueries = {

  createNewBidQuery: `

  INSERT INTO
  bids (
    bidder_id, 
    asset_id, 
    bid_price
    )
    values ($1, $2, $3)
    RETURNING *;
  `,

  getHighestBidByAssetIdQuery: `
  SELECT * 
  FROM bids
  WHERE asset_id = $1
  AND bid_price = (SELECT MAX(weight) FROM bids)
  LIMIT $2;
  `
}

export default bidsQueries;