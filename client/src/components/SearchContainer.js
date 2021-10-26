import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Constants from '../reducers/Constants';
import { GetUsernamesBySearch, GetAssetsByUserId, GetAllCreators } from '../hooks/AssetListHooks';
// import MarketContext from '../context/MarketContext';

const SearchContainer = (props) => {
  const [enteredArtist, setEnteredArtist] = useState('');
  const [searchTextLength, setSearchTextLength] = useState('');
  const [loading, setLoading] = useState(false);
  const [artistSuggestions, setArtistSuggestions] =useState([]);
  const [fullArtistList, setFullArtistList] =useState([]);
  // const marketContext = useContext(MarketContext);
  // const { getAllAssetsNewest, marketAssets, loading } = marketContext;

  useEffect(() => {
    console.log('enteredArtist', enteredArtist);
    console.log('searchTextLength', searchTextLength);
    let filteredArtistList = []
      if (searchTextLength > 0) {
        filteredArtistList = fullArtistList.filter(user => {
        const regex = new RegExp(`${enteredArtist}`, "gi");
        return user.username.match(regex)
        })
        setArtistSuggestions(filteredArtistList);
      } else {
        setArtistSuggestions([])
        props.setSelectedArtistId(null);
      }
      
    }, [enteredArtist])

  const handleAutocomplete = async (text) => {
  
      //FILTER FULL LIST OF CREATORS TO FIND PATTERN ANYWHERE IN USERNAME
      console.log('fullArtistList', fullArtistList);
      console.log('enteredArtist', enteredArtist);
      console.log('searchTextLength', searchTextLength);
      
      setEnteredArtist(text)
      setSearchTextLength(text.length)
      
        // FILTER IN SQL DATABASE WITH WILDCARD AT END ONLY
        // let query = "?";
        // query += `artist=${enteredArtist}`;
        // const artistsList = await GetUsernamesBySearch(props, Constants, setArtistSuggestions, query)
        // console.log(artistsList);
  }

  const handleOnChange = (e) => {
    setEnteredArtist(e.target.value)
    setSearchTextLength(e.target.value.length)
  }

  const handleSearchArtist = async (creator_id) => {
    const searchedArtist = await GetAssetsByUserId(props, Constants, props.setMarketAssets, creator_id, 'creator');
  }

  return (
    <div className='search-container'>
      <input
      className='search-input'
      placeholder='artist filter'
      value={enteredArtist}
      onFocus={()=>{
        if(fullArtistList.length === 0) {
          const creatorsRes = GetAllCreators(props, Constants, setFullArtistList)
          setFullArtistList(creatorsRes);
        }
      }
      }
      onChange= {async (e) => {
        handleAutocomplete(e.target.value)
      }}
      >
      </input>
      <div className='suggestions-container'>
      {artistSuggestions && 
      artistSuggestions.map((suggestion, i) =>
        <div 
          key={i}
          className='search-suggestion'
          onClick={async () => {
            console.log('CLICK ON SUGGESTION')
            console.log('suggestion', suggestion, suggestion.id)
            props.setSelectedArtistId(suggestion.id);
            GetAssetsByUserId(props, Constants, props.setMarketAssets, suggestion.id, 'creator');
            setArtistSuggestions([]);
            setEnteredArtist(suggestion.username)
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