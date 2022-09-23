// npm install reactstrap react react-dom
// npm install --save bootstrap
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { FaHandHoldingHeart } from "react-icons/fa";
import "./Navigation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavItem } from "reactstrap";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/events">
            Events
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink
            className="nav-link"
            to={`/users/${currentUser.username}/myevents`}
          >
            My events
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={logout}>
            Log out {currentUser.first_name || currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md mt-3">
      {/* <FaHandHoldingHeart /> */}
      <Link className="navbar-brand" to="/">
        Giveback
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Navigation;
