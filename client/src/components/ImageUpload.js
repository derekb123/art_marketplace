import React, {useState, Fragment} from 'react';

const ImageUpload = (props) => {

  const OnImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      props.setUploadedImageState([{image: URL.createObjectURL(img)}])
    }
  }

    return (
      <div>
          <div className='create-image-container'>
            {!props.uploadedImageState ? (
              <input
              className='create-image-input'
              type='file'
              name='myImage'
              onChange={OnImageChange}
              />
            ) : (
              <img
              src={props.uploadedImageState[0] && props.uploadedImageState[0].image} 
              alt='your upload'
              >
                {console.log('uploadedImageState inside of img tag',props.uploadedImageState)}
              </img>
            )}
            </div>
            <div>{props.uploadedImageState && (
              <button className='button--confirm'>
                Change Image
              </button>
            )}
            </div>
        </div>
    );
}

export default ImageUpload;