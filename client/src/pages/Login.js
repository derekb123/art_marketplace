import React, {useState} from 'react';
import Button from '../components/Button'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
// import HandleLogin from '../hooks/CustomHooks';
import Constants  from '../reducers/Constants';

const Login = (props) => {

  console.log('common dispatch in login componenet', props.commonDispatch)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  // const UseHandleLogin = (email, password) => {
  //   props.commonDispatch({ type: Constants.LOADING });
  //   return axios
  //     .post('users/login', {email: email, password: password}, {'headers':{'Content-Type': 'application/json'}})
  //     .then((data) => {
  //       console.log('data recieved from login: ',data)
  //       const userToken = data.data.token;
  //       const userName = data.data.username;
  //       localStorage.setItem('token', userToken);
  //       props.commonDispatch({type: Constants.LOG_IN, payload: userName});
  //     })
  //     .catch((error)=> {
  //       console.log('login error: ',error)
  //     })
  // }

  const UseHandleLogin = async (email, password) => {

    try {
      props.commonDispatch({ type: Constants.LOADING });
      const res = await axios.post(
        'users/login', 
        {email: email, password: password}, 
        {'headers':{'Content-Type': 'application/json'}}
        )
      console.log('res recieved from login: ',res)
      const userToken = res.data.token;
      const userName = res.data.username;
      console.log('token and username recieved from login',userToken, userName)
      localStorage.setItem('token', userToken);
      props.commonDispatch({type: Constants.LOG_IN, payload: userName});
    } catch (error) {
      console.log(`login error: ${error}`);
    }
  }

  console.log(props.commonState);

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={(e) => {
        console.log('LOGIN SUBMITTED');
        UseHandleLogin( email, password );
        history.push("/");
        e.preventDefault();
        }}
        >
        <div className='email'>
          <input
            name='email'
            type='text'
            placeholder="Enter your email"
            onChange= {(e) => {
              setEmail( e.target.value)
            }}
            >
          </input>
        </div>
        {/* <br></br> */}
        <div className='password'>
          <input
            name= 'password'
            type= 'password'
            placeholder= "Enter your password"
            onChange= {e => setPassword( e.target.value )}
            >
          </input>
        </div>
        <Button
          className='button--login'
          type='submit'
          name='Login'
          login
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

export default Login;
