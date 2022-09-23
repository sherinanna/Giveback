import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

import UserContext from "./UserContext";

const LoginForm = ({ login }) => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [waitForCurrentUser, setWaitForCurrentUser] = useState();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  let result;
  useEffect(() => {
    console.log(waitForCurrentUser);
    if (waitForCurrentUser) {
      history.push("/events");
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    result = await login(formData);
    console.log(result);
    if (result.success) {
      setWaitForCurrentUser(true);
      console.log(waitForCurrentUser);
    } else alert("Invalid credentials");

    // setFormData("");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };
  return (
    <div className="LoginForm">
      <div className="container col-6  mt-5">
        <div className="card">
          <h3 className="card-title"> Welcome Back</h3>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username"> Username</label>
                <input
                  id="username"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"> Password</label>
                <input
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <br></br>
              <button className="btn btn-success font-weight-bold">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
