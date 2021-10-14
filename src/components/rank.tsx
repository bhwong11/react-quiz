import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import {UserModel} from "../models";
import { RootState } from "../reducers";

const Rank= (props:any)=>{
    const [loading,setLoading] = useState(true)
    const [users,setUsers] = useState([])

    useEffect(()=>{
        UserModel.all().then((json)=>{
            console.log(json)
            setUsers(json.users)
            console.log(users)
            setLoading(false);
            console.log(json.users)
        })
    },[])

    return ( 
        <div>
            {loading?<p>loading...</p>:<div>Hello{users.sort((a:any,b:any) => b.userScore - a.userScore).slice(0,10).map((user:any,index:any)=>{
            return <div>{index+1} {user.username} score:{user.userScore}</div>
        })}</div>}
        </div>
    );
}

export default Rank;