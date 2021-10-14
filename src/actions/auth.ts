import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  
  import {AuthModel,UserModel} from "../models";
  
  export const register = (username:String, email:String, password:String) => (dispatch:any) => {
    return AuthModel.register({username, email, password}).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.message,
        });
  
        return response;
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
      (data:any) => {
        console.log('DATA',data)
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        return Promise.resolve();
      },
      (error:any) => {
        const message =
          (error.response &&
            error.response.message) ||
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
    localStorage.removeItem("uid");
    localStorage.removeItem("user");
  
    dispatch({
      type: LOGOUT,
    });
  };