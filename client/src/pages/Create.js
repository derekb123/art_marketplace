import React, {useState, useEffect, useRef} from 'react';
import Button from '../components/Button'
import ImageUpload from '../components/ImageUpload';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
// import HandleCreate from '../hooks/CustomHooks';
import Constants  from '../reducers/Constants';


const Create = (props) => {

  // console.log('props at Create top', props);
  const imageUploadIcon = 'client/public/upload_image.png'

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [uploadedImageState, setUploadedImageState] = useState(null);
  const creatorId = props.commonState.currentUserId;
  console.log('creatorID', creatorId);

  const history = useHistory();

  const UseHandleCreate = async (title, description, creatorId, price, file) => {

    try {
      props.commonDispatch({ type: Constants.LOADING });
      // console.log('file in usehandlecreate', file);
      let data = new FormData();
      data.append('title', title)
      data.append('description', description)
      data.append('creatorId', creatorId)
      data.append('price', price)
      data.append('file', file)

      axios.post('/assets',
      data
      )
        .then(res => console.log(res))
        .catch(err => console.log(err));
    } catch (error) {
      console.log(`Create error: ${error}`);
    }
  }

  return (
    <div className='create'>
      <h2>Create</h2>
      <article className='create-sections'>
        <section className='create-left'>
          <ImageUpload
          updateImage={uploadedImageState => setUploadedImageState(uploadedImageState)}
          uploadedImageState={uploadedImageState}
          setUploadedImageState={setUploadedImageState}
          >
          </ImageUpload>
        </section>

        <section className='asset-detail-right'>
          <header className='asset-detail-title'>
              <p>Create Your NFT</p>
          </header>
          <form onSubmit={(e) => {
        console.log('LOGIN SUBMITTED');
        // console.log('uploadedimagestate in onSubmit', uploadedImageState);
        UseHandleCreate( title, description, creatorId, price, uploadedImageState );
        e.preventDefault();
        }}>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title.value}
                onChange= {(e) => {setTitle( e.target.value )}}
              >
              </input>
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                value={description.value}
                onChange= {(e) => {setDescription( e.target.value )}}
              >
              </input>
            </div>
             <div>
              <label>Price</label>
              <input
                type="text"
                value={price.value}
                onChange= {(e) => {setPrice( e.target.value )}}
              >
              </input>
            </div>
            <div>
              <Button
                className='button--login'
                type='submit'
                name='Submit'
              >
              </Button>
            </div>
          </form>
          </section>
        </article>
    </div>
  );
}

export default Create;


// const res = await axios.post(
      //   '/assets',
      //   { title, description, creatorId, price },
      //   {withCredentials: true, credentials: 'include'},
      //   {'headers':{'Content-Type':
      //   'application/json'}}
      //   )