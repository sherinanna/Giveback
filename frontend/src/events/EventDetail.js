import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import GivebackApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/** Event Detail page.
 *
 * Renders information about event.
 *
 * Routed at /events/:id
 *
 
 */

function EventDetail() {
  const { id } = useParams();

  console.debug("EventDetail", "id=", id);

  const [event, setEvent] = useState(null);
  const { hasAppliedToEvent, applyToEvent } = useContext(UserContext);
  const [applied, setApplied] = useState();

  useEffect(
    function getEventForUser() {
      async function getEvent() {
        setEvent(await GivebackApi.getEvent(id));
      }

      getEvent();
    },
    [id]
  );

  useEffect(
    function appliedStatus() {
      console.log(hasAppliedToEvent(parseInt(id)));
      setApplied(hasAppliedToEvent(parseInt(id)));
    },
    [id, hasAppliedToEvent]
  );

  /** Apply to volunteer for an event */
  async function handleApply(evt) {
    if (hasAppliedToEvent(event.id)) return;
    applyToEvent(event.id);
    setApplied(true);
  }

  if (!event) return <LoadingSpinner />;

  return (
    <Container className="EventDetail">
      <Row>
        <Col xs={7}>
          <div className="col-md-8 offset-md-2">
            <h4>{event.title} </h4>
            <h5>Organization: {event.organization}</h5>
            <button
              className="btn btn-danger font-weight-bold text-uppercase float-right"
              onClick={handleApply}
              disabled={applied}
            >
              {applied ? "Applied" : "I want to Volunteer"}
            </button>
            <hr />
            <p>{event.description}</p>
          </div>
        </Col>
        <Col>
          <div className="card">
            <div className="card-body">
              <h6 className="card-title"></h6>
              <h5>Category</h5>
              <p> {event.category}</p>
              <h5>Recurrence </h5>
              <p> {event.recurrence}</p>
              <h5>When </h5>
              <p>
                Start Date:
                {/* {new Date(event.startDate).toLocaleDateString()} */}
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(event.startDate))}
              </p>
              <p>
                End Date:
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(event.endDate))}
              </p>
              <h5>Where </h5>
              <div>
                {event.region} ,{event.zipCode}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EventDetail;
