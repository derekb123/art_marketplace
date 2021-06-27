import React, {useState, useEffect, useRef} from 'react';
import Button from '../components/Button'
import ImageUpload from '../components/ImageUpload';
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

  const history = useHistory();

  const UseHandleCreate = async (title, description, price, image) => {

    try {
      props.commonDispatch({ type: Constants.LOADING });
      const res = await axios.post(
        '/assets',
        {withCredentials: true, credentials: 'include'},
        {'headers':{'Content-Type':
        'application/json', title, description, creatorId, price }}
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
          <ImageUpload
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
        UseHandleCreate( title, description, creatorId, price , uploadedImageState );
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
