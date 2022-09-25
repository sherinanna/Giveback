import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import GivebackApi from "../api/api";
import EventCard from "./EventCard";
import LoadingSpinner from "../common/LoadingSpinner";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

/** Show page with list of volunteering events.
 *
 * On mount, loads events from API.
 * Re-loads filtered events on submit from search form.
 *
 * This is routed to at /events
 *
 * Routes -> { EventCard, SearchForm }
 */

function EventList() {
  console.debug("EventList");

  const [events, setEvents] = useState(null);

  useEffect(function getEventsOnMount() {
    console.debug("EventList useEffect getEventsOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads events. */
  async function search(name) {
    let events = await GivebackApi.getEvents(name);
    setEvents(events);
  }

  if (!events) return <LoadingSpinner />;

  return (
    <div className="EventList col-md-8 offset-md-2">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px",
        }}
      >
        <Link
          className="btn btn-success font-weight-bold btn-inline-block"
          to="/events/new"
        >
          Create own events
        </Link>
      </div>
      <SearchForm searchFor={search} />
      {events.length ? (
        <div className="EventList-list">
          {events.map((e) => (
            <EventCard
              key={e.id}
              id={e.id}
              title={e.title}
              description={e.description}
              category={e.category}
              organization={e.organization}
              recurrence={e.recurrence}
              startDate={e.startDate}
              endDate={e.endDate}
              region={e.region}
              zipCode={e.zipCode}
              owner={e.owner}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default EventList;
