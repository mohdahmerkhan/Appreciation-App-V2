import { Fragment, useContext } from "react";
import { UserContext } from "./App";

function MyProfile() {
    const { user } = useContext(UserContext);
    let roleName = "";
    switch(user.roleID)
    {
        case "1":
        roleName = "Admin";
        break;

        case "2":
        roleName = "Staff";
        break;

        case "3":
        roleName = "Recommender";
        break;

        case "4":
        roleName = "Approver";
        break;
    }

    return (
        <Fragment>
            <div className="detailName">
                My Profile
            </div>
            <div className="detailComponent">
                <label>
                    Name
                </label>
                <input type="text" value={user.name} disabled />
            </div>
            <div className="detailComponent">
                <label>
                    Email
                </label>
                <input type="text" value={user.email} disabled />
            </div>
            <div className="detailComponent">
                <label>
                    Score
                </label>
                <input type="text" value={user.score+" point(s)"} disabled />
            </div>
            <div className="detailComponent">
                <label>
                    Role
                </label>
                <input type="text" value={roleName} disabled />
            </div>
            <div className="detailComponent">
                <label>
                    Company
                </label>
                <input type="text" value="Nissan Digital India" disabled />
            </div>
        </Fragment>
    );
}

export default MyProfile;