import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import { login } from "../actions/auth";

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


  function onChangeUsername(e:any) {
    setUsername(e.target.value)
  }

  function onChangePassword(e:any) {
    setPassword(e.target.value)
  }

  function handleLogin(e:any) {
    e.preventDefault();

    setLoading(true)

    const { dispatch, history } = props;

      dispatch(login(username,password))
        .then(() => {
          history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false)
        });
  }
  const { isLoggedIn, message } = props;    

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

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
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
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
    );
}

function mapStateToProps(state:any) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);