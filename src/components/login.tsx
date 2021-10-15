import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";
import { RootState } from "../reducers";
import '../css/loginRegister.css'

const required = (value:any) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login=(props:any)=>{

  const [username,setUsername] =useState("");
  const [password,setPassword] =useState("");
  const [loading,setLoading] =useState(false);

  const { isLoggedIn } = useSelector((state:RootState) => state.auth);
  const { message } = useSelector((state:RootState) => state.message);

  const dispatch = useDispatch();


  function onChangeUsername(e:any) {
    setUsername(e.target.value)
  }

  function onChangePassword(e:any) {
    setPassword(e.target.value)
  }

  async function handleLogin(e:any) {
    e.preventDefault();

    setLoading(true)

    const { history } = props;
    try{
      const loginResult:any = await dispatch(login(username,password))
      if(loginResult.status===200){
        props.history.push("/profile");
        window.location.reload();
      }
    }catch(err){
      console.log(err)
    }
  
      
  }
  
    return (
      <>
      {isLoggedIn?<Redirect to="/" />:
      <div className="login_container">
        <div className="login_wrapper">

          <form
            onSubmit={handleLogin}
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
              >
                {loading? (
                  <span>loading...</span>
                ):<span>Login</span>}
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      }
      </>
    );
}

export default Login;