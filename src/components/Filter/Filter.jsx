import { onAuthStateChanged } from "firebase/auth";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addEvent, auth, checkLoggedIn, getUser } from "../../firebase";
import { LocationSearch } from "../LocationSearch/search";
import "./Filter.css";

export function Filter() {
  const [title, setTitle] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [host, setHost] = useState("");

  useEffect(() => {
    checkLoggedIn();
    let d = new Date();
    let today = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .substring(0, 16);
    // setTimeStart(today);
    // setTimeEnd(today);
    
  }, []);

  function handleFilter() {
    let filterList = [title, host, timeStart, timeEnd];
    console.log('title: ' + title + ', host: ' + host + ", time start: " + timeStart + ', end: ' + timeEnd);
    localStorage.setItem('filter', filterList);
    window.location.replace("/#/dashboard");
  }

  return (
    <div>
      <h1>Filter</h1>
      <label htmlFor="eventTitle">Title</label>
      <input
        type="text"
        id="eventTitle"
        placeholder="Title of Event"
        name="eventTitle"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="eventHost">Host</label>
      <input
        type="text"
        id="eventHost"
        placeholder="Host of Event"
        name="eventHost"
        onChange={(e) => setHost(e.target.value)}
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
          handleFilter();
        }}>
          Filter
        </button>
      </div>

    </div>
  );
}
