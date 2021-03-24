import React from 'react'

const AssetItem = (props) => {
  console.log(props);
  return (
    <div className='asset-item'>
      <div className='asset-title'>
        <h6>{props.title}</h6>
      </div>
    </div>
  )
}

AssetItem.propTypes = {

}

export default AssetItem
