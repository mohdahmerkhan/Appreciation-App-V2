import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { apiURL } from "../config";
import { UserContext } from "../component/App";
import { Navigate } from "react-router-dom";

function ApproveList() {
    // console.log("Approve List");
    const { user } = useContext(UserContext);

    const [pendingAppreciations, setPendingAppreciations] = useState([]);

    let renderContent;
    const [listRenderTime, setListRenderTime] = useState(0);

    

    useEffect(() => {
        if (user && (user.roleID == 4)) {
            axios.get(apiURL + "api/appreciationsByApproval/" + user.email + "&" + user.roleID + "&false").then(
                (response) => {
                    if (response.data == "") {
                        setPendingAppreciations([]);
                    }
                    else {
                        setPendingAppreciations(response.data);
                    }
                }
            );
        }
    }, [listRenderTime,user]);

    if(!user)
    {
        return <Navigate to="/login" />
    }
    else if(user.roleID != 4)
    {
        return <Navigate to="/home" />
    }


    function approveAppreciation(apprID) {

        axios.put(apiURL + 'api/appreciations/' + apprID, apprID).then(
            (response) =>
            {
                alert("Appreciation Approved Successfully");
                setListRenderTime(listRenderTime+1);
            } 
        ).catch(
            (err) => 
            {
                alert("Something went wrong");
            }
        );        
    }

    function rejectAppreciation(apprID) {
        axios.delete(apiURL + 'api/appreciations/' + apprID).then(
            (response) =>
            {
                alert("Appreciation Rejected Successfully");
                setListRenderTime(listRenderTime+1);
            } 
        ).catch(
            (err) => 
            {
                alert("Something went wrong");
            }
        );
    }

    function updateAppreciation(approve, apprID) {
        switch (approve) {
            case true:
                approveAppreciation(apprID);
                break;
            case false:
                rejectAppreciation(apprID);
                break;
        }
    }


    renderContent = pendingAppreciations.map(
        (pendingAppreciation) => {
            return (
                <tr key={pendingAppreciation.apprID}>
                    <td>{pendingAppreciation.apprID}</td>
                    <td>{pendingAppreciation.title}</td>
                    <td>{pendingAppreciation.user.fullName}</td>
                    <td>{pendingAppreciation.recommendBy.fullName}</td>
                    <td>{pendingAppreciation.assignedTo.fullName}</td>
                    <td>
                        <button className="btn btn-outline-success me-2" onClick={() => {updateAppreciation(true, pendingAppreciation.apprID) }}>
                            <b>Approve</b>
                        </button>
                        <button className="btn btn-outline-danger me-2" onClick={ () => {updateAppreciation(false, pendingAppreciation.apprID) }}>
                            <b>Reject</b>
                        </button>
                    </td>
                </tr>
            );
        }
    );



    return (
        <div className="container">
            <div className="header">
                <h3>
                    Approval(s) List For Approver
                </h3>
            </div>
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Appr. ID</th>
                        <th>Title</th>
                        <th>User</th>
                        <th>Recommended By</th>
                        <th>Assigned To</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {renderContent}
                </tbody>
            </table>
        </div>
    );
}

export default ApproveList;