import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axois from "axios";
import {useLocalStorage} from "../hooks";
import AuthFrom from "./AuthForm";

const Login = () => {
    const [user, setUser] = useLocalStorage("user" );
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSubmit = (data) => {
        axois.post("/api/auth/login", { ...data })
            .then(res => {
                setUser(res.data);
                history.push("/channels")
            })
            .catch(error => {
                console.log(error.response);
                setError(error.response.data.message);
            });
    };

    return(
        <div className="auth">
            <AuthFrom from="login" handleSubmit={handleSubmit} />
            {error &&
                <div className="alert danger container mt-20">
                    { error }
                </div>
            }
        </div>
    )
};

export default Login;