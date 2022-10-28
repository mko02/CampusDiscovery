import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./EventCard.css";

export function EventCard(props) {

  return (
    <div className="eventcard">
      <h3 className="eventtitle">{props.event.title}</h3>
      <p className="eventtime">{new Date(props.event.timeStart * 1000 - new Date().getTimezoneOffset() * 60000).toLocaleString()}</p>
    </div>
  );
}
