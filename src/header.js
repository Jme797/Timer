import React from "react";
import hourGlass from "./img/sandglass.png";

function Header() {
    return (
        <div className="header">
            <div className="headerContent">
                <img src={hourGlass} alt="sand glass" />
                <h1>React Timer</h1>
            </div>
        </div>
    )
}

export default Header;