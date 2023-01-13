import React from "react";
import { dateFormat } from "./Utility/Utility";

function ApproverAppreciationList({ appreciations }) {

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
                        {(appreciation.approved) ? dateFormat(appreciation.date) : "------"}
                    </td>
                    <td>
                        {(appreciation.approved) ? (appreciation.active) ? "Approved" : "Rejected" : "Pending"}
                    </td>
                </tr>

            );
        }

        );

    return (
        <div className="container">
            <div className="header">
                <h3>
                    Approver View For Appreciation(s) List
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
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable}
                </tbody>
            </table>
        </div>
    );
}

export default ApproverAppreciationList;