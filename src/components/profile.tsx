import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import {UserModel} from "../models";
import { RootState } from "../reducers";
import '../css/profile.css'

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
      <div className="profile_container">
        <div className="profile_wrapper">
        <header className="Profile_wrapper_element Profile_wrapper_header">
          <h3>
          <strong>USER: {currentUser.user.username}</strong>
          </h3>
        </header>
        <p className="Profile_wrapper_element">
          <strong>Email:</strong> {currentUser.user.email}
        </p>
        <p className="Profile_wrapper_element">
          <strong>Score:</strong> {currentUser.completeScore}
        </p>
        {userRank?<p className="Profile_wrapper_element">
          <strong>Rank:</strong>{userRank}
          </p>:<p>loading rank...</p>}
        <p className="Profile_wrapper_element">score is determined by correct questions: 
            <div>*1 if easy</div>
            <div>*5 if medium</div>
            <div>*10 if hard</div>
        </p>
      </div>
      </div>:
      <Redirect to="/login" />
        }</>
    );
}

export default Profile;