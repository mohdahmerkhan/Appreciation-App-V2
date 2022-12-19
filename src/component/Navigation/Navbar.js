import React, { Fragment, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import NavItem from "./NavItem";

function Navbar() {

    const { user } = useContext(UserContext);

    const [title, setTitle] = useState("");

    if (!user) {
        <Navigate to="login" />
    }

    return (
        <div className="px-3 pb-3 sticky-top navbar navbar-dark bg-light container-fluid justify-content-start">
            <NavItem title="Home" to="home" className="btn-outline-secondary" />
            <NavItem title="About Us" to="aboutUs" className="btn-outline-secondary" />
            <NavItem title="Contact Us" to="contactUs" className="btn-outline-secondary" />
            {user && (user.roleID == "1") && <NavItem title="Appreciation(s) List" to="appreciationList" className="btn-outline-secondary" />}
            {user && (user.roleID == "2") && <NavItem title="Your Appreciation(s)" to="appreciationList" className="btn-outline-secondary" />}
            {user && (user.roleID == "3") && <NavItem title="Recommend" to="recommend" className="btn-outline-secondary" />}
            {user && (user.roleID == "3") && <NavItem title="Recommended Appreciation(s)" to="appreciationList" className="btn-outline-secondary" />}
            {user && (user.roleID == "4") && <NavItem title="Approve" to="approve" className="btn-outline-secondary" />}
            {user && (user.roleID == "4") && <NavItem title="Approved Appreciation(s)" to="appreciationList" className="btn-outline-secondary" />}
    
        </div>
    );
}

export default Navbar;