import axios from 'axios';
import React, {useState, useEffect} from 'react';
// import MarketContext from '../context/MarketContext';

const SearchContainer = (props) => {
  const [enteredArtist, setEnteredArtist] = useState('');
  const [loading, setLoading] = useState(false);
  // const marketContext = useContext(MarketContext);
  // const { getAllAssetsNewest, marketAssets, loading } = marketContext;
  useEffect(() => {
  let query = "?";
      if (enteredArtist.length > 0) {
        setLoading(true);
        query += `artist=${enteredArtist}`;
      }
      const searchRes = axios.get(`/assets/search${query}`)
      props.setMarketAssets(searchRes);
      setLoading(false);

    }, [enteredArtist])
  
    

  return (
    <div>
      <input
      className='search-input'
      placeholder='artist name'
      value={enteredArtist}
      onChange= {(e) => {setEnteredArtist(e.target.value)}}
      >
      
      </input>
    </div>
  )
};

export default SearchContainer;