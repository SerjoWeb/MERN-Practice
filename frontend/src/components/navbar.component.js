import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavBar() {
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();

        auth.logout();
        window.location.href = "/";
    };

    return (
        <div className="App-NavBar">
            <nav>
                <div className="nav-wrapper">
                <NavLink className="brand-logo" to="/">Posts</NavLink>

                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create-post">Create Post</NavLink></li>
                    <li><NavLink to="">Post List</NavLink></li>
                    <li><NavLink to="/" onClick={logoutHandler}>Logout</NavLink></li>
                </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
