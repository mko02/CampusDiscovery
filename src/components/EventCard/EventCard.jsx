import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./EventCard.css";

export function EventCard(props) {
  let startTimeStr = new Date(props.event.timeStart * 1000).toLocaleString();

  let startTimeStrAMorPM = startTimeStr.substring(startTimeStr.length - 3);
  startTimeStr =
    startTimeStr.substring(0, startTimeStr.length - 6) + startTimeStrAMorPM;
  return (
    <div className="eventcard">
      <h3 className="eventtitle">{props.event.title}</h3>
      <p className="eventtime">{startTimeStr}</p>
    </div>
  );
}
