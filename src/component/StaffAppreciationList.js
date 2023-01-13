import React from "react";
import { Link } from "react-router-dom";
import { dateFormat } from "./Utility/Utility";

function StaffAppreciationList({ appreciations }) {

    function alertNotApproved() {
        alert("This Appreciation is not yet approved");
    }


    const renderTable = appreciations.map
        ((appreciation) => {
            return (
                <tr key={appreciation.apprID}>
                    <td>{appreciation.apprID}</td>
                    <td>{appreciation.title}</td>
                    <td>{appreciation.user.fullName}</td>
                    <td>{appreciation.recommendBy.fullName}</td>
                    <td>
                        {(appreciation.assignedTo) ? appreciation.assignedTo.fullName : "------"}
                    </td>
                    <td>
                        {(appreciation.approved) ? appreciation.approvedBy.fullName : "------"}
                    </td>
                    <td>
                        {(appreciation.approved) ?  dateFormat(appreciation.date) : "------"}
                    </td>
                    <td>
                        {
                            (appreciation.approved) ?
                                (
                                    <Link to={"certificate/" + appreciation.apprID}>
                                        <button className="btn btn-outline-success me-2 mb-1">
                                            View (WA)
                                        </button>
                                    </Link>
                                ) :
                                (
                                    <button className="btn btn-outline-success me-2 mb-1" onClick={() => alert("Appreciation not yet approved")}>
                                        View (WA)
                                    </button>
                                )
                        }

                        <Link to={"card/" + appreciation.apprID} >
                            <button className="btn btn-outline-secondary me-2 mb-1">
                                View (OTF)
                            </button>
                        </Link>
                    </td>
                </tr>

            );
        }

        );

    return (
        <div className="container">
            <div className="header">
                <h3>
                    Staff View For Appreciation(s) List
                </h3>
            </div>
            <table className="table table-hover">
                <thead className="table-dark-custom">
                    <tr>
                        <th>Appr. ID</th>
                        <th>Title</th>
                        <th>User</th>
                        <th>Recommended By</th>
                        <th>Assigned To</th>
                        <th>Approved By</th>
                        <th>Approve Date</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable}
                </tbody>
            </table>
        </div>
    );
}

export default StaffAppreciationList;