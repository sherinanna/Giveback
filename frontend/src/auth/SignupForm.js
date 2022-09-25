import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import Alert from "../common/Alert";

const SignupForm = ({ signup }) => {
  const { currentUser } = useContext(UserContext);
  const [waitForCurrentUser, setWaitForCurrentUser] = useState();
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  let result;
  useEffect(() => {
    console.log(waitForCurrentUser);
    if (waitForCurrentUser) {
      history.push("/events");
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    result = await signup(formData);
    setFormData("");

    if (result.success) setWaitForCurrentUser(true);
    else setFormErrors(result.errors);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };
  return (
    <div className="SignupForm">
      <div className="container col-6 mt-5">
        <div className="card">
          <h3 className="card-title"> Sign Up</h3>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username"> Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"> Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName"> First Name</label>
                <input
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName"> Last Name</label>
                <input
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email"> Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <br></br>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}
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

export default SignupForm;
