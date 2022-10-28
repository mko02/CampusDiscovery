import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./EventCard.css";

export function EventCard(props) {

  function formatDate(date) {
    let mm = date.getMonth()+1
  }

  return (
    <div className = "eventcard">
      <h2 className = "eventtitle">{ props.event.title }</h2>
      <p className ="eventtime">{new Date(props.event.timeStart*1000).toLocaleTimeString()}</p>
    </div>
  );
}