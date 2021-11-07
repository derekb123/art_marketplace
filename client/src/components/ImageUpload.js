import React, { useRef, useState, useEffect} from 'react';
import imageUploadIcon from './upload_ image.png';



const ImageUpload = (props) => {

  //REFACTOR PLEASE
  // console.log('props in imageupload', props);
  // console.log('uploadedImageState', props.uploadedImageState);

  const [preview, setPreview] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    if(props.uploadedImageState) {
          let reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(props.uploadedImageState);
    } else {
      setPreview(null);
    }
  }, [props.uploadedImageState]);

 const OnImageChange = (e) => {
  const file = e.target.files[0];
  console.log('initial file in image upload, then file.path', file, file.path);

  if (file) {
    props.updateImage(file);
  } else {
    props.updateImage(null);
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
          <p style={{fontSize: '1rem'}}>
            Click the Browse Image button below to upload your image.
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
        className='common-input'
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

export default ImageUpload;

//&& file.type.substr(0,5) === 'image'