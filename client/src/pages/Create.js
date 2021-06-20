import React, {useState, useEffect, useRef} from 'react';
import Button from '../components/Button'
import ImageUpload from '../components/ImageUpload';
import ImageUpload2 from '../components/ImageUpload2';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
// import HandleCreate from '../hooks/CustomHooks';
import Constants  from '../reducers/Constants';


const Create = (props) => {

  console.log('props at Create top', props);
  const imageUploadIcon = 'client/public/upload_image.png'

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  // const [size, setSize] = useState('');
  const [price, setPrice] = useState(0);
  const [uploadedImageState, setUploadedImageState] = useState();
  const creatorId = props.commonState.currentUser;

    const [preview, setPreview] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    if(uploadedImageState) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(uploadedImageState);
    } else {
      setPreview(null);
    }
  }, [uploadedImageState])

 const OnImageChange = (e) => {
  const file = e.target.files[0];
  if (file && file.type.substr(0,5) === 'image') {
    setUploadedImageState(file);
  } else {
    setUploadedImageState(null);
  }
 }

 const handleOnClick = (e) => {
   e.preventDefault();
   fileInputRef.current.click();
 }


  const history = useHistory();

  const UseHandleCreate = async (title, description, price, image) => {

    try {
      props.commonDispatch({ type: Constants.LOADING });
      const res = await axios.post(
        'assets/create',
        {withCredentials: true, credentials: 'include'},
        {'headers':{'Content-Type':
        'application/json', title, description,image, creatorId, price }}
        )
      const CreateSuccess = res.data.CreateSuccess;
      if (CreateSuccess) {
        history.push("/account");
      }
    } catch (error) {
      console.log(`Create error: ${error}`);
    }
  }

  return (
    <div className='create'>
      <h2>Create</h2>
      <article className='create-sections'>
        <section className='create-left'>
          {/* <div>
            <div className='create-image-container'>
              {preview ? (
                <img
                src={preview} 
                alt='your upload'
                >
                </img>
              ) : (
                <img
                src={'../../../client/public/upload_image.png'} 
                alt='upload image'
                >
                </img>
              )}
              <input
                className='create-image-input'
                ref={fileInputRef}
                type='file'
                name='myImage'
                accept='image/*'
                style={{display: 'none'}}
                onChange={OnImageChange}
                />
              </div>
              <div>{uploadedImageState && (
                <button 
                  className='button--confirm'
                  onClick={handleOnClick}
                >
                  Change Image
                </button>
              )}
              </div>
          </div> */}
          <ImageUpload2
          uploadedImageState={uploadedImageState}
          setUploadedImageState={setUploadedImageState}
          OnImageChange={OnImageChange}
          handleOnClick={handleOnClick}
          >
            
          </ImageUpload2>
        </section>

        <section className='asset-detail-right'>
            <header className='asset-detail-title'>
              <p>Create your NFT</p>
            </header>
            <article>
              <div className='detail-list-price-container'>
                <p className='detail-list-price'>{}</p>
                <p className='detail-sub-words'>List Price</p>
              </div>
              <div className='detail-high-offer-container'>
                <p className='detail-high-offer'>{}</p>
                <p className='detail-sub-words'>Highest Offer</p>
              </div>
            </article>

            <article>
              <div className='adet-buy-button-container'>
                <Button className='adet-buy-button' name='Buy Now' buy></Button>
              </div>
              <div className='adet-buy-button-container'>
                <Button className='adet-buy-button' name='Make Offer' buy></Button>
              </div>
            </article>

            <article>
              <div className='detail-creator-owner-container'>
                <p className='detail-creator-owner'></p>
                <p className='detail-sub-words'>Creator</p>
              </div>
              <div className='detail-creator-owner-container'>
                <p className='detail-creator-owner'></p>
                <p className='detail-sub-words'>Owner</p>
              </div>
            </article>
          </section>
          </article>
    </div>
  );
}

export default Create;
