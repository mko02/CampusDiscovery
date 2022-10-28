import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./EventCard.css";

export function EventCard(props) {
  return (
    <div className = "eventcard">
      <h1 className = "eventtitle">{ props.title }</h1>
    </div>
  );
}