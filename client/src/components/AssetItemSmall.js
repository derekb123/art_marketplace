import React from 'react'
import {Link} from 'react-router-dom';

const AssetItem = (props) => {
  return (
    <Link to={`/assets/${props.id}`}>
      <section className='asset-item'>
        <div className='asset-image'>
          <div className='asset-image-inner'>
            <img className='asset-image-image' src={props.image} alt='badass art'/>
          </div>
        </div>
        <div className='asset-info'>
          <div className='asset-title'>
            <p>{props.title}</p>
          </div>
          <div className='asset-list-price'>
            <p>{props.list_price}</p>
          </div>
        </div>
      </section>
    </Link>
  )
}

export default AssetItem;
