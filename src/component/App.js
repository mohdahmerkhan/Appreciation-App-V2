import React, { createContext, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../page/Home";
import AboutUs from "../page/AboutUs";
import ContactUs from "../page/ContactUs";
import PageNotFound from "../page/PageNotFound";
import Login from "../page/Login";
import Redirect from "../page/Redirect";
import AppreciationList from "../page/AppreciationList";
import ApproveList from "../page/ApproveList";
import RecommendForm from "../page/RecommendForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Certificate from "../page/Certificate";
import CardPage from "../page/CardPage";
import Cart from "../page/Cart";
import MyAccount from "../page/MyAccount";
import Notification from "../page/Notification";
import WishList from "../page/WishList";

export const UserContext = createContext();

function App() {

    // console.log("App");

    let loggedInUser = (localStorage.getItem("USERID")?{
        userID: localStorage.getItem("USERID"),
        roleID: localStorage.getItem("ACCESS_ROLE"),
        email: localStorage.getItem("EMAIL"),
        name: localStorage.getItem("NAME"),
        score : localStorage.getItem("SCORE")
    }:null);

    const [user, setUser] = useState(loggedInUser);

    useEffect(() => {

        // console.log(window.location.pathname);
        if (localStorage.getItem("USERID")) {
            setUser(loggedInUser);
        }

    }, []);

    return (
        <div>
            <UserContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <Header />
                    <Routes path="/">
                        <Route index element={<Home />} />
                        <Route path="home" element={<Home />} />
                        <Route path="aboutUs" element={<AboutUs />} />
                        <Route path="contactUs" element={<ContactUs />} />
                        <Route path="login" element={<Login />} />
                        <Route path="redirect" element={<Redirect />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="notifications" element={<Notification />} />
                        <Route path="wishList" element={<WishList />} />
                        <Route path="myAccount" element={<MyAccount />} />
                        <Route path="appreciationList" element={<AppreciationList />} />
                        <Route path="recommend" element={<RecommendForm />} />
                        <Route path="approve" element={<ApproveList />} />
                        <Route path="appreciationList/certificate/:appreciationID" element={<Certificate appreciationID2={-1} />} />
                        <Route path="appreciationList/card/:appreciationID" element={<CardPage />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
                <Footer />
            </UserContext.Provider>
        </div>
    );
}

export default App;