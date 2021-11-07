import {pool} from "../library/db-pool";
import bidsQueries from "../library/bid-queries";
require('dotenv').config();

const bidsController = {
  createNewBid: function(bidder_id, asset_id, bid_price) {
    const queryParams = [bidder_id, asset_id, bid_price];

    return pool
      .query(bidsQueries.createNewBidQuery, queryParams)
      .then((res)=> {
        console.log('res in controller return', res);
        return res.rows;
      })
      .catch((err: Error) => {
        console.log(err);
      });
  },
  getHighestBidByAssetId: function(asset_id) {
    const queryParams = [asset_id];

    return pool
      .query(bidsQueries.getHighestBidByAssetIdQuery, queryParams)
      .then((res) => {
        console.log('res in gehighestbidbyassetID', res);
        return res.rows;
      })
      .catch((err: Error) => {
        console.log(err);
      });
  },

}

export default bidsController;