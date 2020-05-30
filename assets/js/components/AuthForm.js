import React, {useState} from "react";

const AuthFrom = ({from, handleSubmit}) => {
    const [username, setUsername] = useState("");

    return(
        <form onSubmit={e => handleSubmit(username)} className="auth-form">
            <h1>{from === "login" ? "Login": "Signup"}</h1>
            <div className="field">
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor="username">Display name</label>
            </div>
            <button type="submit">{from === "login" ? "Login": "Signup"}</button>
        </form>
    )
};

export default AuthFrom;