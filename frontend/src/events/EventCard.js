import React from "react";
import { Link } from "react-router-dom";

import "./EventCard.css";

/** Show limited information about an event
 *
 * Is rendered by EventList to show a "card" for each event.
 *
 * EventList -> EventCard
 */

function EventCard(event) {
  console.debug("EventCard");

  return (
    <Link className="EventCard card" to={`/events/${event.id}`}>
      <div className="card-body">
        <h4 className="card-title">{event.title} </h4>
        <h5> with: {event.organization}</h5>

        <h6>{event.region}</h6>
        <p> {event.description} </p>
      </div>
    </Link>
  );
}

export default EventCard;
