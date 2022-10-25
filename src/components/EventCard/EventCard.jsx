import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./EventCard.css";

export function EventCard(props) {
  return (
    <div>
      <h1>{ props.title }</h1>
    </div>
  );
}