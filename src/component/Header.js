import React, { Fragment, useContext } from "react";
import Navbar from "./Navigation/Navbar";
import NavItem from "./Navigation/NavItem";
import { UserContext } from "./App";

function Header() {

    const { user, setUser } = useContext(UserContext);

    const logoutBtn = <button className="mx-1 btn btn-outline-danger" onClick={logOut}>
        <b>
            Logout
        </b>
    </button>;

    const loginBtn = <NavItem title="Login" to="/login" className="btn-outline-primary" />;

    function logOut() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("USERID");
        localStorage.removeItem("ACCESS_ROLE");
        localStorage.removeItem("EMAIL");
        setUser(null);
        alert("Logout Successful !");
        window.location.href = "/";
    }

    return (
        <Fragment>
            <div className="px-3 navbar navbar-light bg-light">
                <div className="container-fluid">
                    <h1 className="display-6">
                        <b>
                            Appreciation App
                        </b>
                    </h1>
                    <div className="float-right">
                        { user && user.name}
                        {(user) ? logoutBtn : loginBtn}
                    </div>
                </div>
            </div>
            <Navbar />
        </Fragment>

    );
}

export default Header;