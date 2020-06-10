import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useLocalStorage} from "../hooks";

export default ({component: Component, ...rest}) => {
    const [user, setUser] = useLocalStorage("user");
    return (
        <Route
            {...rest}
            render={(props) =>
                user && user.displayName ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/"/>
                )
            }
        />
    );
};