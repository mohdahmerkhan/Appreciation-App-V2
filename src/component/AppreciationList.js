import axios from "axios";
import { apiURL } from "../config";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";
import AdminAppreciationList from "./AdminAppreciationList";
import StaffAppreciationList from "./StaffAppreciationList";
import RecommenderAppreciationList from "./RecommenderAppreciationList";
import ApproverAppreciationList from "./ApproverAppreciationList";
import { Navigate } from "react-router-dom";

function AppreciationList() {
    const { user } = useContext(UserContext);
    const [appreciations, setAppreciations] = useState([]);

    useEffect(() => {
        
        if(user)
        {
            axios.get(apiURL + "api/appreciations/" + user.email + "&" + user.roleID).then(
                (response) => {
                    if(response.data == "")
                    {
                        setAppreciations([]);
                    }
                    else
                    {
                        setAppreciations(response.data);
                    }
                }
            );
        }
        
    }, []);

    if (!user) {
        return <Navigate to="/redirect" />;
    }


    return (
        <div>
            {(user && user.roleID == "1") && <AdminAppreciationList appreciations={appreciations} />}
            {(user && user.roleID == "2") && <StaffAppreciationList appreciations={appreciations} />}
            {(user && user.roleID == "3") && <RecommenderAppreciationList appreciations={appreciations} />}
            {(user && user.roleID == "4") && <ApproverAppreciationList appreciations={appreciations} />}
        </div>
    );

}

export default AppreciationList;