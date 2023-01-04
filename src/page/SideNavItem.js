import { useContext } from "react";
import { SideNavContext } from "./MyAccount";

function SideNavItem({ title, icon}) {

    const {selectedAccNav, setSelectedAccNav} = useContext(SideNavContext);

    let tempClassName = "";
    if(selectedAccNav == title)
    {
        tempClassName += " selectedSideNavItem";
    }

    return (
        <div className={"listItem" + tempClassName} onClick={() => setSelectedAccNav(title)}>
            <i className={icon}></i>
            {title}
        </div>
    );
}

export default SideNavItem;