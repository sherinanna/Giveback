import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventCard from "./EventCard";
import GivebackApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
// import UserContext from "../auth/UserContext";
import "./EventCard.css";

// Routed at "users/:username/myevents
const UserEventList = () => {
  console.debug("UserEventList");
  const { username } = useParams();

  //   const { currentUser } = useContext(UserContext);
  //   const events = currentUser.allevents;
  //   console.log(events);

  const [events, setEvents] = useState(null);

  useEffect(
    function getEventsForUser() {
      async function getUserEvents() {
        let user = await GivebackApi.getCurrentUser(username);
        console.log(user);
        setEvents(user.allevents);
      }

      getUserEvents();
    },
    [username]
  );

  if (!events) return <LoadingSpinner />;

  return (
    <div className="EventList col-md-8 offset-md-2">
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
    </div>
  );
};

export default UserEventList;
