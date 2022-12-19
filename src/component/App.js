import React, { createContext, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../page/Home";
import AboutUs from "../page/AboutUs";
import ContactUs from "../page/ContactUs";
import PageNotFound from "../page/PageNotFound";
import Login from "../page/Login";
import Redirect from "../page/Redirect";
import AppreciationList from "../component/AppreciationList";
import ApproveList from "../component/ApproveList";
import RecommendForm from "../page/RecommendForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Certificate from "../page/Certificate";
import Card from "../page/Card";


export const UserContext = createContext();

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        if (localStorage.getItem("USERID")) {
            setUser(
                {
                    userID: localStorage.getItem("USERID"),
                    roleID: localStorage.getItem("ACCESS_ROLE"),
                    email: localStorage.getItem("EMAIL"),
                    name: localStorage.getItem("NAME")
                }
            )
        }

    },[]);


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
                        <Route path="appreciationList" element={<AppreciationList />} />
                        <Route path="recommend" element={<RecommendForm />} />
                        <Route path="approve" element={<ApproveList />} />
                        <Route path="appreciationList/certificate/:appreciationID" element={<Certificate />} />
                        <Route path="appreciationList/card/:appreciationID" element={<Card />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
                <Footer />
            </UserContext.Provider>
        </div>
    );
}

export default App;