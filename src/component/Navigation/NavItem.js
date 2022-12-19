import React from "react"
import { Link } from "react-router-dom";

function NavItem({ title, to, className }) {
    return (
        <Link to={to}>
            <button className={"mx-1 btn " + className}>
                <b>
                    {title}
                </b>
            </button>
        </Link>
    );
}

export default NavItem;