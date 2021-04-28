import React, {useState} from 'react';
import Button from '../components/Button'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
// import HandleCreate from '../hooks/CustomHooks';
import Constants  from '../reducers/Constants';

const Create = (props) => {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  // const [size, setSize] = useState('');
  const [price, setPrice] = useState(0);
  const creatorId = props.commonState.currentUser;

  const history = useHistory();

  const UseHandleCreate = async (title, description, price, image) => {

    try {
      props.commonDispatch({ type: Constants.LOADING });
      const res = await axios.post(
        'assets/create',
        {withCredentials: true, credentials: 'include'},
        {'headers':{'Content-Type': 'application/json',
        title, description,image, creatorId, price }}
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
    <div className="Create">
      <h2>Create</h2>
        <section className='asset-detail-left'>
          <div className='asset-detail-image-container'>
            <img className='asset-detail-image' src={currentAsset.asset_image} alt='badass art'/>
          </div>
        </section>
      <div></div>
      <form onSubmit={(e) => {
        console.log('Create SUBMITTED');
        UseHandleCreate(title, description, image, creatorId, price);
        e.preventDefault();
        }}
        >
        <div className='title'>
          <input
            name='title'
            type='text'
            placeholder="Enter your title"
            onChange= {(e) => {
            setTitle( e.target.value)
            }}
            >
          </input>
        </div>
        {/* <br></br> */}
        <div className='description'>
          <input
            name= 'description'
            type= 'text'
            placeholder= "Enter your description"
            onChange= {e => setDescription( e.target.value )}
            >
          </input>
        </div>
        <Button
          className='button--Create'
          type='submit'
          name='Create'
          Create
        >
        </Button>
      </form>
        <p>Don't have an account?</p>
      <Link  to={'/register'}>
        <p className='wordlink'>Register</p>
      </Link>
    </div>
  );
}

export default Create;
