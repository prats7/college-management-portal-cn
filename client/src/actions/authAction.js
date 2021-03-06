import axios from 'axios';
import { returnErrors } from './errorAction';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  NAME_UPDATE_SUCCESS,
  NAME_UPDATE_FAIL,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAIL
} from './types';



//Check token
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });


  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ userType, name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ userType, name, email, password });

  axios
    .post('/api/user', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Update user password
export const updatePassword = ({ id, password }) => (dispatch, getState) => {

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };


  // Request body
  const body = JSON.stringify({ password });

  axios
    .patch(`/api/auth/password${id}`, body, config)
    .then(res =>
      dispatch({
        type: PASSWORD_UPDATE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'PASSWORD_UPDATE_FAIL')
      );
      dispatch({
        type: PASSWORD_UPDATE_FAIL
      });
    });
};



// Update  User Name
export const updateName = ({ id, name }) => (dispatch, getState) => {

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };


  // Request body
  const body = JSON.stringify({ name });

  axios
    .patch(`/api/auth/${id}`, body, config)
    .then(res =>
      dispatch({
        type: NAME_UPDATE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: NAME_UPDATE_FAIL
      });
    });
};


//Login user
export const login = ({ userType, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ userType, email, password });

  axios
    .post('/api/auth', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};



//Logout user 
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};


// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};