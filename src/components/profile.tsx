import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {UserModel} from "../models";

const Profile= (props:any)=>{

    const [currentUser,setCurrentUser] = useState(props.user)
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [completeScore,setCompleteScore] = useState(0);
    const [signUpDate,setSignUpDate] = useState(null);
    const [userId,setUserId] = useState("");
    const [userScore,setUserScore] = useState(0);
    const [isLoggedInDone,setIsLoggedInDone] = useState(false)
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    useEffect(():void=>{
        console.log('CURRENT USER',currentUser)
        UserModel.show().then(
            (json)=>{
                console.log(json)
                if(json.status===200){
                    setUsername(json.user.username)
                    setEmail(json.user.email)
                    setCompleteScore(json.completeScore)
                    setUserId(json.user._id)
                    setUserScore(json.user.userScore)
                    console.log(currentUser)
                    setIsLoggedIn(true)
                    setIsLoggedInDone(true)
                }else{
                    setIsLoggedInDone(false)
                }
            }
        ).catch(error=>{
            console.log(error)
            setIsLoggedInDone(true)
        })
    },[])

    return (
    <>
    {isLoggedInDone?
        <>{isLoggedIn? 
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Id:</strong> {userId}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>:
      <Redirect to="/login" />
        }</>:
      <div>loading...</div>
    }
    </>
    );
}

function mapStateToProps(state:any) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);