import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import {UserModel} from "../models";
import { RootState } from "../reducers";

const Profile= (props:any)=>{
    const {user:currentUser, isLoggedIn:isLoggedIn} = useSelector((state: RootState)=>state.auth)

    const [userRank,setUserRank]= useState(null)

    useEffect(():void=>{
        console.log('CURRENT USER',currentUser)
        UserModel.show().then((json)=>{
          if(json.status===200){
            setUserRank(json.rank)
          }else{
            setUserRank(json.message)
          }
        }).catch((err)=>{
          console.log("something went wrong")
          setUserRank(err)
        })
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
        {userRank?<div>{userRank}</div>:<div>loading rank...</div>}
      </div>:
      <Redirect to="/login" />
        }</>
    );
}

export default Profile;