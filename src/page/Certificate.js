import "./Certificate.css";
import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../component/App";
import { apiURL } from "../config";
import { dateFormat } from "../component/Utility/Utility";

function Certificate() {

    // console.log("Certificate");
    const { appreciationID } = useParams();

    const { user } = useContext(UserContext);
    const [appreciation, setAppreciation] = useState(null);

    // environment.apiUrl + 'api/appreciation/'+apprID

    useEffect(() => {

        if (user) {
            axios.get(apiURL + 'api/appreciation/' + appreciationID).then(
                (response) => {
                    setAppreciation(response.data);
                }
            );
        }

    }, [user]);

    function downloadCertificate() {
        alert("Download Under Construction");
    }

    return (
        (appreciation) ?
            (
                <Fragment>

                    <div id="mainContainer">
                        <button className="btn btn-secondary downloadBtn" onClick={downloadCertificate}>
                            Download
                        </button>
                        <div className="mainContainer">
                            <div className="certNo">
                                Certificate No. : {appreciation.apprID}
                            </div>
                            <div className="subContainer">
                                <div className="logo">
                                    <img src={apiURL + "images/CertificateLogo.png"} alt="Image Logo" />
                                </div>
                                <h2>
                                    CERTIFICATION OF APPRECIATION
                                </h2>
                                <div className="content">
                                    This certificate is presented to :
                                </div>
                                <div className="name">
                                    {appreciation.user.fullName}
                                </div>
                                <div className="titleArea">
                                    In recognition for a record of outstanding accomplishments
                                </div>
                                <div className="signDate">
                                    <div className="date">
                                        <div className="input">
                                            {dateFormat(appreciation.date)}
                                        </div>
                                        <br />
                                        Date
                                    </div>
                                    <div className="sign">
                                        <div className="input" style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
                                            {appreciation.approvedBy.fullName}...
                                        </div>
                                        <br />
                                        Signature
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ) :
            (
                <h1>Loading</h1>
            )
    );
}

export default Certificate;