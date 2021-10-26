import React, {useState, useEffect, useRef, Fragment} from 'react';
import Button from '../components/Button'
import InfoModal from '../components/InfoModal';
import ImageUpload from '../components/ImageUpload';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
// import HandleCreate from '../hooks/CustomHooks';
import Constants  from '../reducers/Constants';
import Checkbox from '../components/Checkbox';


const Create = (props) => {

  // console.log('props at Create top', props);
  const imageUploadIcon = 'client/public/upload_image.png'

  const [title, setTitle] = useState('');
  const [showCreateConfirm, setShowCreateConfirm] = useState(false)
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [uploadedImageState, setUploadedImageState] = useState(null);
  const creatorId = props.commonState.currentUserId;
  const [checked, setChecked] = useState(true);

  const history = useHistory();

  const UseSetCreator = async (userId) => {

    try {
      props.commonDispatch({ type: Constants.LOADING });
      const setCreatorRes = await axios.put(`/users/${userId}/set-creator`);
      //REFACTOR TO BE MORE SECURE
      if (setCreatorRes) {
        props.commonDispatch({type: Constants.UPDATE_CREATOR })
      }
      console.log('setCreatorRes', setCreatorRes);
    } catch (error) {
      console.log('error inside UseSetCreator: ',error)
    }
  }

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
      axios.post('/assets',data)
        .then(res => {
          if (res) {
            if(!props.commonState.isCreator) {
              UseSetCreator(props.commonState.currentUserId)
            }
          }
        })
        .then(data => {
          setShowCreateConfirm(true)
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(`Create error: ${error}`);
    }
  }

  const UseHandleCheck = () => {
    setChecked(!checked);
  };

  return (
    <div className='create'>
      <h2>Create</h2>

      { showCreateConfirm &&
        <Fragment>
          <InfoModal
          modalTitle ={'Success'}
          modalBody = {'Congratulations! Your creation is a success!'}
          modalButtonName = {'CLOSE'}
          showInfoModal = {showCreateConfirm}
          setShowInfoModal = {setShowCreateConfirm}
          confirmPath={'/account'}
          >
          </InfoModal>
        </Fragment>
      }

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
              <input
                type="text"
                value={title.value}
                onChange= {(e) => {setTitle( e.target.value )}}
                className='common-input'
              >
              </input>
              <label>Title</label>
            </div>
            <div>
              <input
                type="text"
                value={description.value}
                onChange= {(e) => {setDescription( e.target.value )}}
                className='common-input'
              >
              </input>
              <label>Description</label>
            </div>
             <div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value={checked}
                    onChange={UseHandleCheck}
                    className='common-input'
                  />
                  Set for Sale
                </label>
              </div>
              <input
                type="number"
                className='common-input'
                value={price.value}
                onChange= {(e) => {setPrice( parseInt(e.target.value, 10))}}
              >
              </input>
              <label>Price</label>
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