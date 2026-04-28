import axios from 'axios';
import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';

import { API_URL } from '../constants';
import { SET_AUTH_LOADING, LOGIN_SUCCESS, LOGIN_FAIL, SIGNUP_SUCCESS, SIGNUP_FAIL, LOGOUT } from '../constants/authentication';
import handleError from '../utils/error';

export const signUp = (userData) => {
  return async (dispatch) => {
    dispatch({ type: SET_AUTH_LOADING, payload: true });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { token, user, subscribed } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: SIGNUP_SUCCESS, payload: user });
      dispatch(push('/dashboard'));
      dispatch(success({
        title: 'Sucesso!',
        message: 'Você se registrou com sucesso!',
        position: 'tr'
      }));
    } catch (error) {
      handleError(error, dispatch);
      dispatch({ type: SIGNUP_FAIL });
    } finally {
      dispatch({ type: SET_AUTH_LOADING, payload: false });
    }
  };
};

export const login = (userData) => {
  return async (dispatch) => {
    dispatch({ type: SET_AUTH_LOADING, payload: true });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: LOGIN_SUCCESS, payload: user });
      dispatch(push('/dashboard'));
      dispatch(success({
        title: 'Sucesso!',
        message: 'Você logou com sucesso!',
        position: 'tr'
      }));
    } catch (error) {
      handleError(error, dispatch);
      dispatch({ type: LOGIN_FAIL });
    } finally {
      dispatch({ type: SET_AUTH_LOADING, payload: false });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch({ type: LOGOUT });
    dispatch(push('/login'));
  };
};
