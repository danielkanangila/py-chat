import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Channels from "./components/Channels";
import Channel from "./components/Channel";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useLocalStorage } from "./hooks";

const App = () => {
  const [user, setUser] = useLocalStorage("user");
  const [channel, setChannel] = useLocalStorage("channel");
  const history = useHistory();
  useEffect(() => {
    if (user && user.displayName) {
      if (channel && channel.channel) {
        const CId = channel.channel.id;
        history.push(`/channels/${CId}`);
      }
    }
  }, []);
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/channels" component={Channels} />
        <PrivateRoute path="/channels/:id" component={Channel} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
