import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import {UserModel} from "../models";
import { RootState } from "../reducers";
import '../css/rank.css';

const Rank= (props:any)=>{
    const [loading,setLoading] = useState(true)
    const [users,setUsers] = useState([])

    useEffect(()=>{
        UserModel.all().then((json)=>{
            setUsers(json.users)
            setLoading(false);
            console.log(json.users)
        })
    },[])

    return ( 
        <div className="ranks_container">
            <div className="ranks_wrapper">
            <h3>Top 10 Trivia Masters</h3>
            {loading?<h3>loading...</h3>:<div className="ranks_card_wrapper">{users.sort((a:any,b:any) => b.userScore - a.userScore).slice(0,10).map((user:any,index:any)=>{
            return <div className="ranks_card"><strong>Rank:{index+1}</strong> {user.username} <p>score:{user.userScore}</p></div>
        })}</div>}
            </div>
        </div>
    );
}

export default Rank;