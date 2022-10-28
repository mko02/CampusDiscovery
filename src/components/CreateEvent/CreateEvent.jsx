import { onAuthStateChanged } from "firebase/auth";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addEvent, auth, checkLoggedIn, getUser } from "../../firebase";
import "./CreateEvent.css";
export function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescr] = useState("");
  const [location, setLocation] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [host, setHost] = useState("");

  useEffect(() => {
    checkLoggedIn();
    let d = new Date();
    let today = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .substring(0, 16);
    setTimeStart(today);
    setTimeEnd(today);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setHost(user.uid)
      }
    })
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
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="eventDescription">Event Description: </label>
      <textarea
        id="eventDescription"
        name="evetDescription"
        rows="5"
        cols="33"
        placeholder="Event Description"
        onChange={(e) => setDescr(e.target.value)}
      ></textarea>
      <label htmlFor="eventLocation">Location:</label>
      <input
        type="text"
        id="eventLocation"
        placeholder="Enter Event Location"
        name="eventLocation"
        onChange={(e) => setLocation(e.target.value)}
      />
      <label htmlFor="eventStartTime">Event Start</label>
      <input
        type="datetime-local"
        id="eventstartTime"
        placeholder="Enter Event Start Time"
        name="eventStartTime"
        defaultValue={timeStart}
        onChange={(e) => setTimeStart(e.target.value)}
      />
      <label htmlFor="eventEndTime">Event End</label>
      <input
        type="datetime-local"
        id="eventEndTime"
        placeholder="Enter Event End Time"
        name="eventEndTime"
        defaultValue={timeEnd}
        onChange={(e) => setTimeEnd(e.target.value)}
      />
      <div className = "create_event_button">
        <button 
        type="submit"
        onClick={() => {
          addEvent(
            title,
            description,
            location,
            timeStart,
            timeEnd,
            host
          ).then((res) => {
            window.location.assign(`/#/event/dashboard`);
          });
        }}>
          Submit
        </button>
      </div>
    </div>
  );
}
