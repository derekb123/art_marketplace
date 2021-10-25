import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Constants from '../reducers/Constants';
import { GetUsernamesBySearch, GetAssetsByUserId } from '../hooks/AssetListHooks';
// import MarketContext from '../context/MarketContext';

const SearchContainer = (props) => {
  const [enteredArtist, setEnteredArtist] = useState('');
  const [loading, setLoading] = useState(false);
  const [artistSuggestions, setArtistSuggestions] =useState([]);
  // const marketContext = useContext(MarketContext);
  // const { getAllAssetsNewest, marketAssets, loading } = marketContext;
  // useEffect(() => {
  // let query = "?";
  //     if (enteredArtist.length > 0) {
  //       query += `artist=${enteredArtist}`;
  //       setLoading(true);
  //       const artistsList = GetUsernamesBySearch(props, Constants, axios, setArtistSuggestions, query)
  //       console.log(artistsList);
  //     setLoading(false);
  //     }
  //   }, [enteredArtist])

  const handleAutocomplete = async () => {
  let query = "?";
      if (enteredArtist.length > 0) {
        query += `artist=${enteredArtist}`;
        const artistsList = await GetUsernamesBySearch(props, Constants, axios, setArtistSuggestions, query)
        console.log(artistsList);
      }
  }

  const handleSearchArtist = async (creator_id) => {
    const searchedArtist = await GetAssetsByUserId(props, Constants, axios, props.setMarketAssets, creator_id);
  }

  return (
    <div className='search-container'>
      <input
      className='search-input'
      placeholder='artist name'
      value={enteredArtist}
      onChange= {(e) => {
        setEnteredArtist(e.target.value)
        handleAutocomplete(enteredArtist)
      }}
      >
      </input>
      <div className='suggestions-container'>
      {artistSuggestions && 
      artistSuggestions.map((suggestion, i) =>
        <div 
          key={i}
          className='search-suggestion'
          onClick={async (suggestion) => {
            console.log('CLICK ON SUGGESTION')
            await GetAssetsByUserId(props, Constants, axios, props.setMarketAssets, suggestion.id);
          }}
          >
            {suggestion.username}
        </div>
      )}
      </div>
    </div>
  )
};

export default SearchContainer;