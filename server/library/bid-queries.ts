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
  `
}

export default bidsQueries;