import React from "react";
import { db } from "../../firebase";
import "./EditEvent.css";

export function EditEvent() {
  return (
    <div>
      <h1>Edit Event</h1>
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
      />
      <label htmlFor="eventEndTime">Event End</label>
      <input
        type="datetime-local"
        id="eventEndTime"
        placeholder="Enter Event End Time"
        name="eventEndTime"
      />
      <br></br>

      <button type="submit" className="button">
        Submit
      </button>
    </div>
  );
}
