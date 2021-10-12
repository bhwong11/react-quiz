import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  
  import {AuthModel} from "../models";
  
  export const register = (username:String, email:String, password:String) => (dispatch:any) => {
    return AuthModel.register({username, email, password}).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const login = (username:String, password:String) => (dispatch:any) => {
    return AuthModel.login({username, password}).then(
      (data) => {
        console.log('DATA',data)
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        localStorage.setItem("uid", data.token);
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch:any) => {
    localStorage.removeItem("user");
  
    dispatch({
      type: LOGOUT,
    });
  };