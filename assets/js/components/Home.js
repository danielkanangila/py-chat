import React, {useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {useLocalStorage} from "../hooks";
import AuthFrom from "./AuthForm";


const Home = () => {
    const [user, setUser] = useLocalStorage("user" );
    const history = useHistory();

    const onSignIn = googleUser => {
        console.log(googleUser.getBasicProfile());
    };

    const handleSubmit = (e, credentials) => {
        e.preventDefault();

        axios.post("/api/auth/register", credentials)
            .then(res => {
                setUser(res.data);
                history.push("/channels")
            })
            .catch(error => console.log(error.response));
    };

    return(
        <div className="auth">
            <AuthFrom from="login" handleSubmit={handleSubmit} />
        </div>
    )
};

export default Home;