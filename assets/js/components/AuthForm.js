import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const AuthFrom = ({from, handleSubmit}) => {
    const [displayName, setDisplayName] = useState("");
    const history = useHistory();

    const redirect = (e) => {
        e.preventDefault();
        const url =  from === "login" ? "/" : "/login";
        history.push(url);
    }

    return(
        <form onSubmit={e => {e.preventDefault(); handleSubmit({displayName})}} className="auth-form">
            <h1>{from === "login" ? "Login": "Signup"}</h1>
            <div className="field">
                <input
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    placeholder="Dan Joe"
                    required
                />
                <label htmlFor="username">Display name</label>
            </div>
            <div className="form-action">
                <button type="submit">{from === "login" ? "Login": "Signup"}</button>
                <button className="btn-default" onClick={redirect} type="submit">{from === "login" ? "Register": "Login"}</button>
            </div>

        </form>
    )
};

export default AuthFrom;