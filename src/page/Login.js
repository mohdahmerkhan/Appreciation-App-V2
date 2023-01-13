import React, { useContext, useState } from "react";
import axios from "axios";
import { apiURL } from "../../src/config";
import { UserContext } from "../component/App";
import { Navigate } from "react-router-dom";

function Login() {
    // console.log("Login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formSubmit, setFormSubmit] = useState(false);
    const [emailInput, setEmailInput] = useState(false);
    const [passwordInput, setPasswordInput] = useState(false);
    const [error, setError] = useState(null);
    const {user, setUser} = useContext(UserContext);

    function onEmailChange(event) {
        setEmail(event.target.value);
        setEmailInput(event.target.value !== "");
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
        setPasswordInput(event.target.value !== "");
    }

    function onFormSubmit(event) {
        event.preventDefault();
        setFormSubmit(true);

        if (!(emailInput && passwordInput)) {
            return;
        }

        console.log("Contacting Login API");

        axios.get(apiURL + "api/userLogin/" + email + "&" + password).then(
            (response ) => {
                console.log(response.data);
                let result = response.data; 
                if (result === "")
                {
                    setError("Invalid Email or Password");
                    return;
                }
                else
                { 
                    setError(null);
                    // Insert UserID in LocalStorage
                    localStorage.setItem("NAME", result.fullName);
                    localStorage.setItem("USERID", result.userID + "");
                    localStorage.setItem("ACCESS_ROLE", result.role.roleID + "");
                    localStorage.setItem("EMAIL", result.email + "");
                    localStorage.setItem("SCORE",result.score + "");

                    //Logged In
                    alert("Log In Successfull");

                    setUser(
                        {
                            userID : result.userID,
                            roleID : result.role.roleID,
                            email : result.email,
                            name : result.fullName
                        }
                    );
                    
                    console.log("Navigating -------------------------");
                }
            }
        ).catch(
            (error) => 
            {
                console.log("Catch Error");
            }
        );

    }

    if(user)
    {
        return <Navigate to="/redirect" />;
    }


    return (
        <div className="container content card my-3 p-3" style={{ maxWidth: "400px" }}>
            <h3 className="pb-2" style={{ borderBottom: "1px solid lightgray" }}>
                Sign In
            </h3>
            <form className="pt-2" onSubmit={onFormSubmit}>
                <div className="mb-3">
                    <input type="text" value={email} onChange={onEmailChange} placeholder="Enter Email" className="form-control" />
                    <div className="error">
                        {formSubmit && !emailInput && "Email is required"}
                    </div>
                </div>

                <div className="my-3">
                    <input type="password" value={password} onChange={onPasswordChange} placeholder="Enter Password" className="form-control" />
                    <div className="error">
                        {formSubmit && !passwordInput && "Password is required"}
                    </div>
                </div>

                <div className="error" style={{fontSize:"100%"}}>
                        {error && "Invalid Email or Password"}
                    </div>
                <div className="mt-4">
                    <button type="submit" className="btn btn-md btn-outline-primary">
                        <i className="fa fa-sign-in">
                        </i>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login