import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../component/App";
import { apiURL } from "../config";
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
        (appreciationItem, index) => {
            return (
                <div className="timelineCard" key={appreciationItem.apprID}>
                    <img src={apiURL + "/images/profile-picture/" + appreciationItem.user.userID + ".jpg"} />
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
            {
                !user
                &&
                <div className="content card my-5">
                    <div className="text-center">
                        <div className="card-body">
                            <h3 className="card-title">
                                Welcome to Appreciation App
                            </h3>
                            <p className="card-text">Get the best Appreciation Service Here.{!user && " For availing the service please login"}</p>
                            <Link to="/login">
                                <div className="navItem">
                                    Login
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            }
            {
                user
                &&
                <div className="homeWrapper">
                    <div className="contentContainer">
                        <div className="leftContainer">
                            <div className="profileContainer">
                                <div className="image">
                                    <img src={apiURL + "/images/profile-picture/" + user.userID + ".jpg"} alt="Profile Picture" />
                                </div>
                                <div className="accountHolderName">
                                    {user.name}
                                </div>
                                <div className="departmentName">
                                    IB6 GA & B2E System
                                </div>
                                <div className="list">
                                    <div className="listItem">
                                        <i className="fa-solid fa-award"></i>
                                        Appreciations
                                    </div>
                                    <div className="listItem">
                                        <i className="fa-solid fa-trophy"></i>
                                        Awards
                                    </div>
                                    <div className="listItem">
                                        <i className="fa-solid fa-gift"></i>
                                        Greetings
                                    </div>
                                    <div className="listItem">
                                        <i className="fa-solid fa-chart-line"></i>
                                        Insights
                                    </div>
                                    <div className="listItem">
                                        <i className="fa-solid fa-list-check"></i>
                                        To-Do-List
                                    </div>
                                    <div className="listItem">
                                        <i className="fa-solid fa-square-poll-horizontal"></i>
                                        Budget Report
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="timelineCardList">
                            {renderTimelineCardList}
                        </div>
                        <div className="rightContainer">
                            <div className="trendAds">
                                Trends & Advertisements
                            </div>
                            <div className="leaderboard">
                                <div className="list">
                                    <div className="title">
                                        Leader Board - Monthly
                                    </div>
                                    <div className="userPosition">
                                        &nbsp;
                                        <i className="fa-solid fa-award"></i>
                                        12
                                        <img src={apiURL + "/images/profile-picture/" + user.userID + ".jpg"} />
                                        {user.name} (You)
                                    </div>
                                    <div className="listItem">
                                        &nbsp;
                                        <i className="fa-solid fa-trophy"></i>
                                        &nbsp;
                                        1
                                        &nbsp;
                                        Howard
                                    </div>
                                    <div className="listItem">
                                        &nbsp;
                                        <i className="fa-solid fa-trophy"></i>
                                        &nbsp;
                                        2
                                        &nbsp;
                                        John
                                    </div>
                                    <div className="listItem">
                                        &nbsp;
                                        <i className="fa-solid fa-trophy"></i>
                                        &nbsp;
                                        3
                                        &nbsp;
                                        Emily
                                    </div>
                                    <div className="listItem">
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;
                                        4
                                        &nbsp;
                                        Alexander
                                    </div>
                                    <div className="listItem">
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;
                                        5
                                        &nbsp;
                                        Christine
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>

    );
}

export default Home;