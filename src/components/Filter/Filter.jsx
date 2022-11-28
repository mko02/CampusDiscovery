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

  const [sortType, setSortType] = useState();

  useEffect(() => {
    checkLoggedIn();

    let filterList = JSON.parse(localStorage.getItem('filter'));
    console.log(filterList);
    if (filterList != null) {
      setTitle(filterList[0]);
      setHost(filterList[1]);

      setTimeStart(
        new Date(
          filterList[2] * 1000 - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substring(0, 16)
      );
      setTimeEnd(
        new Date(
          filterList[3] * 1000 - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substring(0, 16)
      );
    }


    if(localStorage.getItem("sort") == null) {
      localStorage.setItem("sort", "date");
    }
    setSortType(localStorage.getItem("sort"));
    
  }, []);

  function handleSave() {
    let actualTimeStart = new Date(timeStart).getTime() / 1000;
    let actualTimeEnd = new Date(timeEnd).getTime() / 1000;
    let filterList = [title, host, actualTimeStart, actualTimeEnd];
    console.log('title: ' + title + ', host: ' + host + ", time start: " + timeStart + ', end: ' + timeEnd);
    localStorage.setItem('filter', JSON.stringify(filterList));
    localStorage.setItem('sort', sortType);
    alert("Saved preferences!")
  }

  return (
    <div>
      <h2>Sort</h2>
      <label htmlFor="sort-start" className="sortFilterBtns">
        <input type="radio" id="filter-start"
        checked={sortType === "date"}
        onChange={(e) => setSortType("date")} />
        Start Date
      </label>
      <label htmlFor="sort-event" className="sortFilterBtns">
        <input type="radio" id="sort-event"
        checked={sortType === "eventName"}
        onChange={(e) => setSortType("eventName")} />
        Event Name
      </label>
      <label htmlFor="sort-host" className="sortFilterBtns">
        <input type="radio" id="sort-host"
        checked={sortType === "host"}
        onChange={(e) => setSortType("host")} />
        Host Name
      </label>
      <h2>Filter</h2>
      <label htmlFor="eventTitle">Title</label>
      <input
        type="text"
        id="eventTitle"
        placeholder="Title of Event"
        name="eventTitle"
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="eventHost">Host</label>
      <input
        type="text"
        id="eventHost"
        placeholder="Host of Event"
        name="eventHost"
        defaultValue={host}
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
          handleSave();
        }}>
          Save
        </button>
      </div>

    </div>
  );
}
