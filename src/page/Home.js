import React, { useContext } from "react";
import { UserContext } from "../component/App";
import NavItem from "../component/Navigation/NavItem";

function Home() {

    const { user } = useContext(UserContext);

    return (
        <div className="content card my-5">
            <div className="text-center">
                <div className="card-body">
                    <h3 className="card-title">
                        Welcome to Appreciation App
                    </h3>
                    <p className="card-text">Get the best Appreciation Service Here.{ !user && " For availing the service please login"}</p>
                    { !user && <NavItem title="Login" to="/login" className="btn-outline-primary"/>}
                </div>
            </div>
        </div>
        
    );
}

export default Home;