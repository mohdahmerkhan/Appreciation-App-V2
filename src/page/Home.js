import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../component/App";
import { apiURL } from "../config";
import ProfileImage from "../images/Profile.jpg";
import Card from "../component/Card";
import TimeAgo from "../component/TimeAgo";

function Home() {
    // console.log("Home");
    const { user } = useContext(UserContext);
    const [appreciations, setAppreciations] = useState([]);

    useEffect(() => {
        axios.get(apiURL + "api/appreciations").then(
            (response) => {
                // console.log(response.data);
                setAppreciations(response.data)
            }
        );
    }, []);


    const renderTimelineCardList = appreciations.map(
        (appreciationItem,index) => {
            return (
                <div className="timelineCard" key={appreciationItem.apprID}>
                    <img src={ProfileImage} />
                    <div className="content">
                        {appreciationItem.user.fullName} <span style={{ color: "darkslategrey", fontSize: "medium" }}>was appreciated by</span> {appreciationItem.recommendBy.fullName}
                    </div>
                    <div className="timeAgo">
                        <TimeAgo createdDate={appreciationItem.createdDate} />
                    </div>
                    <div className="photo">
                        <Card appreciationID={appreciationItem.apprID} />
                    </div>
                    <div className="caption">
                        #Cheers #Thank You
                    </div>
                    <div className="respondList">
                        <span className="respond">
                            <i className="fa-regular fa-thumbs-up"></i>
                            &nbsp;
                            Like
                        </span>
                        <span className="respond">
                            <i className="fa-regular fa-comment"></i>
                            &nbsp;
                            Comment
                        </span>
                        <span className="respond">
                            <i className="fa-solid fa-share"></i>
                            &nbsp;
                            Share
                        </span>
                    </div>
                </div>
            );
        }
    );

    return (
        <Fragment>
            <div className="content card my-5">
                <div className="text-center">
                    <div className="card-body">
                        <h3 className="card-title">
                            Welcome to Appreciation App
                        </h3>
                        <p className="card-text">Get the best Appreciation Service Here.{!user && " For availing the service please login"}</p>
                        {
                            !user
                            &&
                            <Link to="/login">
                                <div className="navItem">
                                    Login
                                </div>
                            </Link>
                        }
                    </div>
                </div>
            </div>
            <div className="timelineCardList">
                {user && renderTimelineCardList}
            </div>
        </Fragment>

    );
}

export default Home;