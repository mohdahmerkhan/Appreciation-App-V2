import React, { createContext, Fragment, useContext, useEffect, useState } from "react";
import Navbar from "./Navigation/Navbar";
import { UserContext } from "./App";
import { Link } from "react-router-dom";

export const NavContext = createContext();

function Header() {
    // console.log("Header");
    const { user, setUser } = useContext(UserContext);
    const [selectedNav, setSelectedNav] = useState("");

    // console.log(window.location.pathname);
    useEffect(() => 
    {
        if (window.location.pathname.slice(1) == "") {
            setSelectedNav("home");
        }
        else {
            switch (window.location.pathname.slice(1)) {
                case "home":
                case "aboutUs":
                case "contactUs":
                case "appreciationList":
                case "recommend":
                case "approve":
                case "cart":
                case "notifications":
                case "wishList":
                case "myAccount":
                    setSelectedNav(window.location.pathname.slice(1));
                    break;
                default:
                    setSelectedNav("");
            }
        }
    });


    const logoutBtn = <div className="navItem" onClick={logOut}>
        Logout
    </div>;

    const loginBtn = <Link to="/login">
        <div className="navItem">
            Login
        </div>
    </Link>;

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
        <NavContext.Provider value={{ selectedNav, setSelectedNav }}>
            <div className="px-3 navbar navbar-light bg-light">
                <div className="container-fluid">
                    <div className="float-left">
                        <div className="companyLogo">
                            <h1>
                                Trail Blazers
                            </h1>
                        </div>
                        <div className="searchBarDiv">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Search for Employees..." />
                        </div>
                    </div>
                    <div className="float-right">
                        {
                            user
                            &&
                            <Fragment>
                                <Link to="/wishList">
                                    <div className={(selectedNav == "wishList")?"navIcons selectedNavIcon":"navIcons"} onClick={() => setSelectedNav("wishList")}>
                                        <i className="fa-regular fa-heart"></i>
                                    </div>
                                </Link>
                                <Link to="/cart">
                                    <div className={(selectedNav == "cart")?"navIcons selectedNavIcon":"navIcons"} onClick={() => setSelectedNav("cart")}>
                                        <i className='fas fa-shopping-cart'></i>
                                    </div>
                                </Link>
                                <Link to="/notifications">
                                    <div className={(selectedNav == "notifications")?"navIcons selectedNavIcon":"navIcons"} onClick={() => setSelectedNav("notifications")}>
                                        <i className='far fa-bell'></i>
                                    </div>
                                </Link>
                                <Link to="/myAccount">
                                    <div className={(selectedNav == "myAccount")?"navProfileIcon selectedNavProfileIcon":"navProfileIcon"} onClick={() => setSelectedNav("myAccount")}>
                                        {user.name}
                                        &nbsp;
                                        <i className='fas fa-user-circle'></i>
                                    </div>
                                </Link>
                            </Fragment>
                        }

                        {(user) ? logoutBtn : loginBtn}
                    </div>
                </div>
            </div>
            <Navbar />
        </NavContext.Provider>
    );
}

export default Header;