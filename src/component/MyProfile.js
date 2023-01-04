import { Fragment, useContext } from "react";
import { UserContext } from "./App";

function MyProfile() {
    const { user } = useContext(UserContext);
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
                <input type="text" value="35 Points" disabled />
            </div>
            <div className="detailComponent">
                <label>
                    Phone No.
                </label>
                <input type="text" value="+91 9876543210" disabled />
            </div>
            <div className="detailComponent">
                <label>
                    Location
                </label>
                <input type="text" value="Trivandrum, Kerala" disabled />
            </div>
        </Fragment>
    );
}

export default MyProfile;