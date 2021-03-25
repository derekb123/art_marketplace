import React from 'react'

const AssetItem = (props) => {
  return (
    <section className='asset-item'>
      <div className='asset-image'>
        <img  src={props.image} alt='badass art'/>
      </div>
      <div className='asset-title'>
        <p>{props.title}</p>
      </div>
    </section>
  )
}

AssetItem.propTypes = {

}

export default AssetItem
