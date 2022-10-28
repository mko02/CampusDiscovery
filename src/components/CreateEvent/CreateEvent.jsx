import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CreateEvent.css";

export function CreateEvent() {
  const [date, setDate] = useState("");
  useEffect(() => {
    let d = new Date();
    let today = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .substring(0, 16);
    console.log(today);
    setDate(today);
  }, []);

  return (
    <div>
      <h1>Create Event:</h1>
      <label htmlFor="eventTitle">Title</label>
      <input
        type="text"
        id="eventTitle"
        placeholder="Title of Event"
        name="eventTitle"
      />
      <label htmlFor="eventDescription">Event Description: </label>
      <textarea
        id="eventDescription"
        name="evetDescription"
        rows="5"
        cols="33"
        placeholder="Event Description"
      ></textarea>
      <label htmlFor="eventLocation">Location:</label>
      <input
        type="text"
        id="eventLocation"
        placeholder="Enter Event Location"
        name="eventLocation"
      />
      <label htmlFor="eventStartTime">Event Start</label>
      <input
        type="datetime-local"
        id="eventstartTime"
        placeholder="Enter Event Start Time"
        name="eventStartTime"
        defaultValue={date}
      />
      <label htmlFor="eventEndTime">Event End</label>
      <input
        type="datetime-local"
        id="eventEndTime"
        placeholder="Enter Event End Time"
        name="eventEndTime"
        defaultValue={date}
      />
      <div className = "create_event_button">
        <button type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}
