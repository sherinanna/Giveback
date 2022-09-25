import React, { useEffect, useState, useContext } from "react";
import GivebackApi from "../api/api";
import { useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";

const NewEventForm = () => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  //   const [waitForCurrentUser, setWaitForCurrentUser] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    organization: "",
    recurrence: "",
    startDate: "",
    endDate: "",
    region: "",
    zipCode: "",
    owner: currentUser.username,
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug("NewEventForm");

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and form data
   *   - redirect to list of events
   */

  async function handleSubmit(e) {
    e.preventDefault();
    let newEvent;
    try {
      newEvent = await GivebackApi.createEvent(formData);
    } catch (errors) {
      setFormErrors(errors);
      //   alert("Invalid input");
      return;
    }

    setFormData("");
    setFormErrors([]);
    history.push("/events");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };
  return (
    <div className="NewEventForm">
      <div className="container col-6  mt-5">
        <div className="card">
          <h3 className="card-title"> Create an event</h3>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label> Event Title</label>
                <input
                  id="title"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label> Description</label>
                <input
                  id="description"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label> Category</label>
                <input
                  id="category"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label> Organization</label>
                <input
                  id="organization"
                  name="organization"
                  className="form-control"
                  value={formData.organization}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label> Recurrence</label>
                <input
                  id="recurrence"
                  name="recurrence"
                  className="form-control"
                  value={formData.recurrence}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label> Start date</label>
                <input
                  id="startDate"
                  name="startDate"
                  className="form-control"
                  value={formData.startDate}
                  placeholder="eg: June 6 2022"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label> End date </label>
                <input
                  id="endDate"
                  name="endDate"
                  className="form-control"
                  value={formData.endDate}
                  placeholder="eg: June 7 2022"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label> Region</label>
                <input
                  id="region"
                  name="region"
                  className="form-control"
                  value={formData.region}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label> Zip code</label>
                <input
                  id="zipCode"
                  name="zipCode"
                  className="form-control"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-2">
                <label>
                  <b>Owner</b>
                </label>
                <p className="form-control-plaintext">{formData.owner}</p>
              </div>

              <br></br>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              <button className="btn btn-success font-weight-bold">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEventForm;
