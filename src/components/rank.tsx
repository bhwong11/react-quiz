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
            {loading?<p>loading...</p>:<div>Hello{users.map((user:any,index:any)=>{
            return <div>{index+1} {user.username}</div>
        }).sort((a:any,b:any) => a.userScore - b.userScore)}</div>}
        </div>
    );
}

export default Rank;