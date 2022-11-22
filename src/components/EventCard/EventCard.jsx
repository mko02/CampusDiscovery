import React, { useState } from "react";
import "./EventCard.css";

export function EventCard(props) {
  let startTimeStr = new Date(props.event.timeStart * 1000).toLocaleString();
  let startTimeStrAMorPM = startTimeStr.substring(startTimeStr.length - 3);
  startTimeStr =
    startTimeStr.substring(0, startTimeStr.length - 6) + startTimeStrAMorPM; 
    console.log(props.color)
  const style = {
    border: '2px solid ' + props.color
  }
  return (
    <div className="eventcard" style = { style }>
      <h3 className="eventtitle">{props.event.title}</h3>
      <p className="eventtime">{startTimeStr}</p>
    </div>
  );
}