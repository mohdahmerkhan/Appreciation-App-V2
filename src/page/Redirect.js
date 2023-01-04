import React, { Fragment, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../component/App";

function Redirect() {

    // console.log("Redirect");
    const { user } = useContext(UserContext);
    
    if (!user) {
        console.log("Going to Login");
        return <Navigate to="/login" />
    }
    else
    {
        console.log("Going to Home");
        window.location.pathname = "/home";
        // return <Navigate to="/home" />
    }
}

export default Redirect;