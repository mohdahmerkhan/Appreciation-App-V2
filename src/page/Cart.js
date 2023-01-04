import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../component/App";

function Cart()
{
    const { user } = useContext(UserContext);

    if(!user)
    {
        return <Navigate to="/redirect" />;
    }

    return <h1>Cart Page</h1>
}

export default Cart;