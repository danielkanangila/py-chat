import React from "react";
import  { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Channels from "./components/Channels";
import Channel from "./components/Channel";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact  path="/login" component={Login} />
            <PrivateRoute exact path="/channels" component={Channels} />
            <PrivateRoute path="/channels/:id" component={Channel} />
        </Switch>
    );
};

export default App;