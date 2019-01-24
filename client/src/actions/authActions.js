import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER, LOADING, NOT_LOADING } from './types'

// Register User
export const registerUser = (userData, history) => dispatch => {
  dispatch(loading());
  axios
    .post('/api/users/register', userData)
    .then(res => {
      history.push('/login');
      dispatch(stopLoading());
    })
    .catch(err =>{
      dispatch(stopLoading());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

// Login - Get User Token
export const loginUser = userData => dispatch => {
  dispatch(loading());
  axios
    .post('/api/users/login', userData)
    .then(res => {
      dispatch(stopLoading())
      const { token } = res.data

      localStorage.setItem('jwtToken', token)

      setAuthToken(token)

      const decoded = jwt_decode(token)

      dispatch(setCurrentUser(decoded))
    })
    .catch(err => {
      dispatch(stopLoading());
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    })
}

export const loading = () => {
  return {
    type: LOADING
  };
};

//stop loading

export const stopLoading = () => {
  return {
    type: NOT_LOADING
  };
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}
