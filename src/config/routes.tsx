import React, { useEffect } from "react";
import { BrowserRouter,Switch, Route,Link, Redirect } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../reducers";

import Login from "../components/login";
import Profile from "../components/profile";
import register from "../components/register";
import Home from "../components/home";
import Rank from "../components/rank";
import { logout } from "../actions/auth";
import '../css/navbar.css'

function Routes(props:any) {
  const {user:currentUser, isLoggedIn:isLoggedIn} = useSelector((state: RootState)=>state.auth)
  const dispatch = useDispatch();
  const logoutHandler = ()=>{
    dispatch(logout())
  }

  return (
    <BrowserRouter>
    {isLoggedIn? 
      <nav className="navbar">
        <div className="nav_container">
          <span>{currentUser.user.username}</span>
            <Link to={'/profile'}>Profile</Link>
            <Link to={'/'}>Play</Link>
            <a href="/login" onClick={logoutHandler}>Logout</a>
        </div>
      </nav>:
      <nav>
          <div className="nav_container">
            <Link to={'/'}>Play</Link>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>
          </div>
      </nav>
        }
    <Switch>
      <Route exact path='/login' component={Login} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/register' component={register} />
        <Route exact path='/' component={Home} />
        <Route exact path='/rank' component={Rank} />
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;