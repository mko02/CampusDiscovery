import { onAuthStateChanged } from "firebase/auth";
import React, { Component, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { addEvent, auth, checkLoggedIn, getUser } from "../../firebase";
import { LocationSearch } from "../LocationSearch/search";
import "./Filter.css";

export function Filter() {
  const [sortType, setSortType] = useState();
  const [sortReverse, setSortReverse] = useState(true);

  const hostRef = useRef(null);
  const locationRef = useRef(null);
  const timeStartRef = useRef(null);
  const timeEndRef = useRef(null);

  useEffect(() => {
    checkLoggedIn();

    let filterList = JSON.parse(localStorage.getItem("filter"));
    if (filterList != null) {
      hostRef.current.value = filterList[0];
      locationRef.current.value = filterList[1];

      if (filterList[2] != null) {
        timeStartRef.current.value = new Date(
          filterList[2] * 1000 - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substring(0, 16);
      }
      if (filterList[3] != null) {
        timeEndRef.current.value = new Date(
          filterList[3] * 1000 - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substring(0, 16);
      }
    }

    if (localStorage.getItem("sort") == null) {
      localStorage.setItem("sort", "date");
    }
    setSortType(localStorage.getItem("sort"));

    if (localStorage.getItem("reverse") == null) {
      localStorage.setItem("reverse", 0);
    }
    setSortReverse(parseInt(localStorage.getItem("reverse")));
  }, []);

  function handleSave() {
    let actualTimeStart = new Date(timeStartRef.current.value).getTime() / 1000;
    let actualTimeEnd = new Date(timeEndRef.current.value).getTime() / 1000;
    let filterList = [
      hostRef.current.value,
      locationRef.current.value,
      actualTimeStart,
      actualTimeEnd,
    ];
    localStorage.setItem("filter", JSON.stringify(filterList));
    localStorage.setItem("reverse", sortReverse);
    localStorage.setItem("sort", sortType);
    alert("Saved preferences!");
  }

  return (
    <div>
      <h2 style={{ paddingTop: "30px" }}>Sort</h2>
      <label>Sort Criteria<br /><br /></label>
      <label htmlFor="sort-start" className="sortFilterBtns">
        <input
          type="radio"
          id="sort-start"
          checked={sortType === "date"}
          onChange={(e) => setSortType("date")}
        />
        Start Date
      </label>
      <label htmlFor="sort-event" className="sortFilterBtns">
        <input
          type="radio"
          id="sort-event"
          checked={sortType === "eventName"}
          onChange={(e) => setSortType("eventName")}
        />
        Event Name
      </label>
      <label htmlFor="sort-host" className="sortFilterBtns">
        <input
          type="radio"
          id="sort-host"
          checked={sortType === "host"}
          onChange={(e) => setSortType("host")}
        />
        Host Name
      </label>
      <label htmlFor="sort-reverse" className="sortReverse">
      Reverse?<br/>
        <input
          type="checkbox"
          id="sort-reverse"
          checked={sortReverse === 1}
          onChange={(e) => setSortReverse(1 - sortReverse)}
        />
      </label>
      <h2>Filter</h2>
      <label htmlFor="eventHost">Host</label>
      <input
        type="text"
        id="eventHost"
        placeholder="Host of Event"
        name="eventHost"
        ref={hostRef}
      />
      <label htmlFor="eventLocation">Location</label>
      <input
        type="text"
        id="eventLocation"
        placeholder="Location of Event"
        name="eventLocation"
        ref={locationRef}
      />
      <label htmlFor="eventStartTime">Event Start</label>
      <input
        type="datetime-local"
        id="eventstartTime"
        placeholder="Enter Event Start Time"
        name="eventStartTime"
        ref={timeStartRef}
      />
      <label htmlFor="eventEndTime">Event End</label>
      <input
        type="datetime-local"
        id="eventEndTime"
        placeholder="Enter Event End Time"
        name="eventEndTime"
        ref={timeEndRef}
      />
      <div className="create_event_button">
        <button
          type="submit"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
