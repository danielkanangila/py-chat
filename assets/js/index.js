import React from "react";
import  RenderDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./app";

RenderDom.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);
