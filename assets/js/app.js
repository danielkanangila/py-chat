import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Channels from "./components/Channels";
import Channel from "./components/Channel";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
    return (
        <>
            <NavBar/>
            <Switch>

                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <PrivateRoute exact path="/channels" component={Channels}/>
                <PrivateRoute path="/channels/:id" component={Channel}/>

            </Switch>
            <Footer/>
        </>
    );
};

export default App;