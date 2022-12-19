import "./Who.css";
import axios from "axios";
import React, { Fragment, useEffect, useState, useRef, useContext } from "react";
import { apiURL } from "../config";
import { RecommendErrorContext } from "../page/RecommendForm";
import { UserContext } from "./App";

function Who({ staff, setStaff, ccTo, setCcTo, error}) {
    const [whoSearchTerm, setWhoSearchTerm] = useState("");
    const [ccToSearchTerm, setCcToSearchTerm] = useState("");
    const [staffList, setStaffList] = useState([]);
    const [ccToList, setCcToList] = useState([]);
    const [expandWho, setExpandWho] = useState(false);
    const [expandCcTo, setExpandCcTo] = useState(false);
    const { isSubmit } = useContext(RecommendErrorContext);

    const { user } = useContext(UserContext);

    const whoDivElement = useRef();
    const ccToDivElement = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!whoDivElement.current.contains(event.target)) {
                setExpandWho(false);
            }

            if (!ccToDivElement.current.contains(event.target)) {
                setExpandCcTo(false);
            }
        };

        document.addEventListener('click', handler, true);

        axios.get(apiURL + "api/staffs").then(
            (response) => {
                setStaffList(response.data);
            }
        );

        axios.get(apiURL + "api/users").then(
            (response) => {
                setCcToList(response.data);
            }
        );

        // Clean Up Function
        return () => {
            document.removeEventListener('click', handler);
            console.log("removing");
        }

    }, []);

    const renderStaffList = staffList.map(
        (staffItem) => {

            if (staff && (staff.userID == staffItem.userID)) {
                return;
            }

            if(staffItem.userID == user.userID)
            {
                return;
            }

            if ((staffItem.email.toUpperCase().search(whoSearchTerm.toUpperCase()) > -1) && (staffItem.fullName.toUpperCase().search(whoSearchTerm.toUpperCase()) > -1)) {
                return (
                    <Fragment key={staffItem.userID} >
                        <div className="option" onClick={() => onWhoClick(staffItem)}>
                            {staffItem.fullName + " (" + staffItem.email + ")"}
                        </div>
                    </Fragment>
                );
            }
        }
    );



    const renderCcToList = ccToList.map(
        (ccToItem) => {

            if(staff && staff.userID == ccToItem.userID)
            {
                return;
            }

            if(ccToItem.userID == user.userID)
            {
                return;
            }

            for (let i = 0; i < ccTo.length; i += 1) {
                if (ccToItem.userID == ccTo[i].userID) {
                    return;
                }
            }

            if ((ccToItem.email.toUpperCase().search(ccToSearchTerm.toUpperCase()) > -1) && (ccToItem.fullName.toUpperCase().search(ccToSearchTerm.toUpperCase()) > -1)) {
                return (
                    <Fragment key={ccToItem.userID} >
                        <div className="option" onClick={() => addInCcTo(ccToItem)}>
                            {ccToItem.fullName + " (" + ccToItem.email + ")"}
                        </div>
                    </Fragment>
                );
            }
        }
    );

    const renderSelectedCcTo = ccTo.map(
        (ccToItem) => {
            return (
                <span className="ccToName" key={ccToItem.userID}>
                    {ccToItem.fullName + " (" + ccToItem.email + ")"}
                    <label className="removeCcTo" onClick={() => removeFromCcTo(ccToItem)}>
                        ×
                    </label>
                </span>
            );
        }
    );

    function addInCcTo(ccToAdd) {
        const tempCcTo = [...ccTo, ccToAdd];
        setCcToSearchTerm("");
        setCcTo(tempCcTo);
    }

    function removeFromCcTo(ccToRemove) {
        const tempCcTo = ccTo.filter(
            (ccToItem) => {
                if (ccToItem.userID == ccToRemove.userID) {
                    return false;
                }

                return true;
            }
        );
        setCcTo(tempCcTo);
    }

    function onWhoClick(staffItem) {

        for (let i = 0; i < ccTo.length; i += 1)
        {
            if (staffItem.userID == ccTo[i].userID) {
                removeFromCcTo(staffItem);
            }
        }
        setStaff(staffItem);
        setWhoSearchTerm("");
        setExpandWho(false);
    }


    return (
        <div className="container whoContainer">
            <div className="form-group">
                <label htmlFor="staff">
                    Whom do you want to Appreciate ???
                </label>
                <br />
                {
                    staff
                    &&
                    <span className="selectedName">
                        {staff.fullName + " (" + staff.email + ")"}
                        {
                            staff
                            &&
                            <span className="removeSelect" onClick={() => setStaff(null)}>
                                ×
                            </span>
                        }
                    </span>
                }
                {
                    (isSubmit && error)
                    &&
                    <small className="error">
                        Choose anyone to appreciate
                    </small>
                }
                <div ref={whoDivElement} className="staffContainer">
                    <input
                        type="text"
                        id="staff"
                        className="form-control"
                        placeholder="Choose a Staff"
                        value={whoSearchTerm}
                        onChange={(e) => setWhoSearchTerm(e.target.value)}
                        onClick={() => setExpandWho(!expandWho)} />
                    {
                        expandWho
                        &&
                        <div className="hiddenDiv">
                            {renderStaffList}
                        </div>
                    }

                </div>
            </div>
            <div className="form-group">
                <label htmlFor="ccTo">
                    Also Share with
                </label>
                <div className="ccToNames">
                    {renderSelectedCcTo}
                </div>
                <div ref={ccToDivElement} className="ccToContainer">
                    <input
                        type="text"
                        id="ccTo"
                        className="form-control"
                        placeholder="CC To"
                        value={ccToSearchTerm}
                        onChange={(e) => setCcToSearchTerm(e.target.value)}
                        onClick={() => setExpandCcTo(!expandCcTo)} />
                        {
                            expandCcTo
                            &&
                            <div className="hiddenDiv">
                                {renderCcToList}
                            </div>
                        }
                </div>
            </div>
        </div>
    );
}

export default Who;