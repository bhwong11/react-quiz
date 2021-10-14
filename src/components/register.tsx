import React, { useState } from "react";

import { useDispatch,useSelector } from "react-redux";
import { register } from "../actions/auth";
import { RootState } from "../reducers";
import { Redirect } from 'react-router-dom';


const Register =(props:any)=>{

    const [username,setUsername] =useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] =useState("");
    const [successful,setSuccessful]=useState(false)
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state:RootState) => state.auth);
    const { message } = useSelector((state:RootState) => state.message);
  function onChangeUsername(e:any) {
    setUsername(e.target.value)
  }

  function onChangeEmail(e:any) {
    setEmail(e.target.value)
  }

  function onChangePassword(e:any) {
    setPassword(e.target.value)
  }

  async function handleRegister(e:any) {
    e.preventDefault();
    try{
      const registerResult:any =  await dispatch( register(username, email, password))
      if(registerResult.status===200){
        setSuccessful(true)
        props.history.push("/login");
        window.location.reload();
      }
    }catch(err){
      setSuccessful(false)
    }
     
  }

    return (
      <>
      {
        isLoggedIn?<Redirect to="/" />:
        <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <form
            onSubmit={handleRegister}
          >
            {!successful && (
              <div>
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
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
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
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
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

export default Register;