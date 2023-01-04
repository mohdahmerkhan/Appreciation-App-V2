import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../component/App";

function Notification()
{
    const { user } = useContext(UserContext);

    if(!user)
    {
        return <Navigate to="/redirect" />;
    }
    return <h1>Notification Page</h1>
}

export default Notification;