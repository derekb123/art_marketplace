import React, {useState} from 'react'
import {Link} from 'react-router-dom';

const AssetItemSmall = (props) => {
const [imageLoaded, setImageLoaded] = useState({ imageStatus: "Loading..." })

  return (
    <Link to={`/assets/${props.id}`}>
      <section className='asset-item'>
        <div className='asset-image'>
          <div className='asset-image-inner'>
           <img 
            className='asset-image-image' 
            src={props.image} 
            alt='badass art'
            // onLoad={setImageLoaded({imageStatus: ""})}
            // onError={setImageLoaded({imageStatus: "Failed to Load"})}
          />
          {/* {imageLoaded.imageStatus} */}
          </div>
        </div>
        <div className='asset-info'>
          <div className='asset-title'>
            <div>{props.title}</div>
          </div>
          <div className='asset-list-price'>
            <div>{props.list_price > 0 ? `$${props.list_price}` : 'Not For Sale'}</div>
          </div>
        </div>
      </section>
    </Link>
  )
}

export default AssetItemSmall;
