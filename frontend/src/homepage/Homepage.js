import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
    <div className="Homepage">
      <div className="container Homepage-content">
        <h1 className="mb-4 font-weight-bold">Giveback</h1>
        <p className="lead">
          All the opportunities waiting for the right volunteer to step up.
          Start here!
        </p>
        {currentUser ? (
          <h2>
            Welcome Back, {currentUser.firstName || currentUser.username}!
          </h2>
        ) : (
          <p>
            <Link className="btn btn-success font-weight-bold " to="/login">
              Log in
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link className="btn btn-success font-weight-bold " to="/signup">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
