import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axois from "axios";
import {useLocalStorage} from "../hooks";
import AuthFrom from "./AuthForm";

const Login = () => {
    const [user, setUser] = useLocalStorage("user" );
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSubmit = (e, data) => {
        e.preventDefault();

        axois.post("/api/auth/login", { data })
            .then(res => {
                setUser(res.data);
                history.push("/channels")
            })
            .catch(error => {
                console.log(error.response);
                setError("An error occurred while trying to register your username.");
            });
    };

    return(
        <div className="auth">
            <AuthFrom from="login" handleSubmit={handleSubmit} />
            I do not have an account <Link to="/">Register</Link>
        </div>
    )
};

export default Login;