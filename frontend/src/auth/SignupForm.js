import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";

const SignupForm = ({ signup }) => {
  const { currentUser } = useContext(UserContext);
  const [waitForCurrentUser, setWaitForCurrentUser] = useState();
  const history = useHistory();
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
    result = await signup(formData);
    setFormData("");

    if (result.success) setWaitForCurrentUser(true);
    else alert("Unsuccessful signup");
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
      <div className="container col-6 ">
        <h3> Sign Up</h3>
        <div className="card">
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
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
