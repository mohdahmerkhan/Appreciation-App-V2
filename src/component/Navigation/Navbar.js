import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import NavItem from "./NavItem";


function Navbar() {

    // console.log("NavBar");
    const { user } = useContext(UserContext);

    if (!user) {
        <Navigate to="login" />
    }

    return (
            <div className="navBar">
                <NavItem title="Home" to="home" />
                <NavItem title="About Us" to="aboutUs" />
                <NavItem title="Contact Us" to="contactUs" />
                {user && (user.roleID == "1") && <NavItem title="Appreciation(s) List" to="appreciationList" />}
                {user && (user.roleID == "2") && <NavItem title="Your Appreciation(s)" to="appreciationList" />}
                {user && (user.roleID == "3") && <NavItem title="Recommend" to="recommend" />}
                {user && (user.roleID == "3") && <NavItem title="Recommended Appreciation(s)" to="appreciationList" />}
                {user && (user.roleID == "4") && <NavItem title="Approve" to="approve" />}
                {user && (user.roleID == "4") && <NavItem title="Approved Appreciation(s)" to="appreciationList" />}
            </div>
    );
}

export default Navbar;