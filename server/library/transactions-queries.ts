const transactionsQueries = {

  createNewTransactionQuery:

  `INSERT INTO
  transactions (
    asset_id,
    buyer_id,
    seller_id,
    creator_id,
    payment_method,
    sale_price,
    )
    values ($1, $2, $3, $4, $5, $6)
    RETURNING *;
 `,

}

export default transactionsQueries;