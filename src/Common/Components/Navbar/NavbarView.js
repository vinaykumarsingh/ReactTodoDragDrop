import React from "react";
import { NavLink } from "react-router-dom";

const NavbarView = () => {
    return (
        <div className="navbarContainer">
            <a className="brandName">LOGO</a>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/createList">Create Todo</NavLink></li>
            </ul>
        </div>
    )
}

export default NavbarView