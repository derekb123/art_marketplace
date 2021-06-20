import React, { useRef, useState, useEffect, Fragment} from 'react';
import imageUploadIcon from './upload_ image.png';



const ImageUpload2 = (props) => {

  //REFACTOR PLEASE
  console.log('props in imageupload2', props);

  const [preview, setPreview] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    if(props.uploadedImageState) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(props.uploadedImageState);
    } else {
      setPreview(null);
    }
  }, [props.uploadedImageState])

 const OnImageChange = (e) => {
  const file = e.target.files[0];
  if (file && file.type.substr(0,5) === 'image') {
    props.setUploadedImageState(file);
  } else {
    props.setUploadedImageState(null);
  }
 }

 const handleOnClick = (e) => {
   e.preventDefault();
   fileInputRef.current.click();
 }

  return (
  <div>
    <div className='create-image-container'>
      {preview ? (
         <img
        src={preview} 
        alt='your upload'
        >
        </img>
      ) : (
        <div>
          <img
            className='upload-icon'
            src={imageUploadIcon} 
            alt='upload image'
          >
          </img>
          <p>
            CLICK BROWSE OR DROP YOUR IMAGE HERE
          </p>
        </div>
       
      )}
      <input
        // className='create-image-input'
        ref={fileInputRef}
        type='file'
        name='myImage'
        accept='image/*'
        style={{display: 'none'}}
        onChange={OnImageChange}
        />
      </div>
    <button 
          className='button--confirm'
          onClick={handleOnClick}
        >
          Browse Image
        </button>
    </div>
)
};

export default ImageUpload2;