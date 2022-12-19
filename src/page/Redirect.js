import React, { Fragment, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../component/App";
import NavItem from "../component/Navigation/NavItem";

function Landing() {
    const { user } = useContext(UserContext);
    
    if (!user) {
        return <Navigate to="/login" />
    }
    else
    {
        return <Navigate to="/appreciationList" />
    }
}

export default Landing;