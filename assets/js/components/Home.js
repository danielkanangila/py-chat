import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {useLocalStorage} from "../hooks";
import AuthFrom from "./AuthForm";
import Logo from "./Logo";


const Home = () => {
    const [user, setUser] = useLocalStorage("user" );
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = (credentials) => {
        axios.post("/api/auth/register", credentials)
            .then(res => {
                setUser(res.data);
                history.push("/channels")
            })
            .catch(error => setError(error.response.data.message));
    };

    return(
        <div className="auth">
            <Logo/>
            <AuthFrom from="register" handleSubmit={handleSubmit} />
            {error &&
                <div className="alert danger container mt-20">
                    { error }
                </div>
            }
        </div>
    )
};

export default Home;