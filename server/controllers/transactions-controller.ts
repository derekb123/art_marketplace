import {pool} from "../library/db-pool";
import transactionsQueries from "../library/transactions-queries";
require('dotenv').config();

const transactionsController = {
  createNewTransaction: function(asset_id, buyer_id,  seller_id, creator_id, payment_method, sale_price) {
    const queryParams = [asset_id, buyer_id, seller_id, creator_id, payment_method, sale_price];

    return pool
      .query(transactionsQueries.createNewTransactionQuery, queryParams)
      .then((res)=> {
        console.log('res in controller return', res);
        return res.rows;
      })
      .catch((err: Error) => {
        console.log(err);
      });
  },

}

export default transactionsController;