import React, { useEffect } from "react";
import { BrowserRouter,Switch, Route, Redirect } from "react-router-dom";

import Login from "../components/login";
import Profile from "../components/profile";
import register from "../components/register";
import Home from "../components/home";
import Rank from "../components/rank";


function Routes(props:any) {

  return (
    <BrowserRouter>
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