import React from 'react'

const AssetItem = (props) => {
  return (
    <section className='asset-item'>
      <div className='asset-image'>
        <div className='asset-image-inner'>
          <img  src={props.image} alt='badass art'/>
        </div>
      </div>
      <div className='asset-info'>
        <div className='asset-title'>
          <p>{props.title}</p>
        </div>
      </div>
    </section>
  )
}

AssetItem.propTypes = {

}

export default AssetItem
