import axios from 'axios';
const ROOT_URL = 'http://localhost:8000';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_USERS = 'GET_USERS';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';
//axios.defaults.withCredentials = true

export const authError = (error) => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error.response.data.error,
  };
};

export const register = (username, password, confirmPassword, history) => {
  return (dispatch) => {
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios.post(`${ROOT_URL}/users`, { username, password })
      .then((ret) => {
        dispatch({
          type: USER_REGISTERED,
        });
        history.push('/signin');
      })
      .catch((ret) => {
        dispatch(authError('Failed to register user'));
      });
  };
};


export const signIn = (username, password, history) => {
  console.log(username, password)
  return (dispatch) => {
    axios.post(`${ROOT_URL}/login`, { username, password })
      .then((ret) => {
        console.log(ret)
        localStorage.setItem('token', ret.data.token)
        dispatch({
          type: USER_AUTHENTICATED,
        });
     
        //history.push('/users');
      })
      .catch((ret) => {
        dispatch(authError(ret));
      });
  };
};

export const signOutUser = () => {
  return (dispatch) => {
    localStorage.setItem('token', '');
    dispatch({
      type: USER_UNAUTHENTICATED,
    });
  };
};

export const getUsers = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/restricted/users`)
      .then((response)=> {
        dispatch({
          type: GET_USERS,
          payload: response.data
        });
      })
      .catch(() => {
        dispatch(authError('Failed to fetch users'));
      });
  };
};

export const checkIfAuthenticated = () => {
  return {
    type: CHECK_IF_AUTHENTICATED
  };
};