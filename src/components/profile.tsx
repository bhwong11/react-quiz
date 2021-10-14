import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import {UserModel} from "../models";
import { RootState } from "../reducers";

const Profile= (props:any)=>{
    const {user:currentUser, isLoggedIn:isLoggedIn} = useSelector((state: RootState)=>state.auth)

    useEffect(():void=>{
        console.log('CURRENT USER',currentUser)
    },[])

    return (
        <>{isLoggedIn? 
      <div className="container">
        <header className="jumbotron">
          <h3>
          <strong>USER!! {currentUser.user.username}</strong>
          <strong>SCORE!! {currentUser.completeScore}</strong>
          <strong>SCORE!! {currentUser.user.userScore}</strong>
            <strong> {currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Id:</strong> {currentUser.user._id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.user.email}
        </p>
      </div>:
      <Redirect to="/login" />
        }</>
    );
}

export default Profile;