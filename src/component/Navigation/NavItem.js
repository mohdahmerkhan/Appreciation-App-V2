import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { NavContext } from "../Header";

function NavItem({ title, to}) {

    // console.log("NavItem");

    let extraClassName = "";
    const {selectedNav, setSelectedNav} = useContext(NavContext);

    if(selectedNav == to)
    {
        extraClassName = "selectedNavItem";
    }

    return (
        <Link to={to}>
            <div className={"navItem " + extraClassName} onClick={ ()=> setSelectedNav(title)}>
                {title}
            </div>
        </Link>
    );
}

export default NavItem;