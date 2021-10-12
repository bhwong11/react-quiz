import React, { useEffect } from "react";
import { BrowserRouter,Switch, Route, Redirect } from "react-router-dom";

import Login from "../components/login";
import Profile from "../components/profile";
import register from "../components/register";


function Routes(props:any) {

  return (
    <BrowserRouter>
    <Switch>
      <Route exact path='/login' component={Login} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/register' component={register} />
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;