import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../component/App";
import Card from "../component/Card";

function CardPage()
{
    const {user} = useContext(UserContext)

    if(!user)
    {
        <Navigate to="/redirect" />
    }
    const {appreciationID} = useParams();
    return <Card appreciationID={appreciationID} />;
}

export default CardPage;