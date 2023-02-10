import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../component/App";
import MyProfile from "../component/MyProfile";
import MyAppreciations from "../component/MyAppreciations";
import MyAwards from "../component/MyAwards";
import MyBudgetReport from "../component/MyBudgetReport";
import MyGreetings from "../component/MyGreetings";
import MyInsights from "../component/MyInsights";
import MyToDoList from "../component/MyToDoList";
import SideNavItem from "./SideNavItem";
import { apiURL } from "../config";

export const SideNavContext = createContext();

function MyAccount() {
    const { user } = useContext(UserContext);
    const [ selectedAccNav, setSelectedAccNav] = useState("My Profile");

    if (!user) {
        return <Navigate to="/redirect" />;
    }

    return (
        <div className="accountWrapper">
            <div className="accountHeader">
                Account Settings
            </div>
            <div className="accountDetailWrapper">
                <div className="accountDetails">
                    <div className="leftContainer">
                        <div className="image">
                            <img src={apiURL + "images/profile-picture/"+user.userID+".jpg"} alt="Default Profile" />
                        </div>
                        <div className="accountHolderName">
                            {
                                user.name
                            }
                        </div>
                        <div className="departmentName">
                            IB6 GA and B2E Systems
                        </div>
                        <div className="list">
                            <SideNavContext.Provider value={{selectedAccNav, setSelectedAccNav}}>
                                <SideNavItem title="My Profile" icon="fa-solid fa-user-circle" />
                                <SideNavItem title="Appreciations" icon="fa-solid fa-award" />
                                <SideNavItem title="Awards" icon="fa-solid fa-trophy" />
                                <SideNavItem title="Greetings" icon="fa-solid fa-gift" />
                                <SideNavItem title="Insights" icon="fa-solid fa-chart-line" />
                                <SideNavItem title="To Do List" icon="fa-solid fa-list-check" />
                                <SideNavItem title="Budget Report" icon="fa-solid fa-square-poll-horizontal" />
                            </SideNavContext.Provider>
                        </div>
                    </div>
                    <div className="expandDetails">
                        { (selectedAccNav === "My Profile") && <MyProfile />}
                        { (selectedAccNav === "Appreciations") && <MyAppreciations />}
                        { (selectedAccNav === "Awards") && <MyAwards />}
                        { (selectedAccNav === "Greetings") && <MyGreetings />}
                        { (selectedAccNav === "Insights") && <MyInsights />}
                        { (selectedAccNav === "To Do List") && <MyToDoList />}
                        { (selectedAccNav === "Budget Report") && <MyBudgetReport />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;