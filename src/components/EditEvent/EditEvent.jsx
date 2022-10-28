import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { editEvent, getEvent } from "../../firebase";
import "./EditEvent.css";

export function EditEvent() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescr] = useState("");
  const [location, setLocation] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [host, setHost] = useState("");
  useEffect(() => {
    getEvent(id)
      .then((snap) => {
        if (snap.exists()) {
          const val = snap.val();
          setTitle(val.title);
          setDescr(val.description);
          setLocation(val.location);
          setTimeStart(
            new Date(
              val.timeStart * 1000 - new Date().getTimezoneOffset() * 60000
            )
              .toISOString()
              .substring(0, 16)
          );
          setTimeEnd(
            new Date(
              val.timeEnd * 1000 - new Date().getTimezoneOffset() * 60000
            )
              .toISOString()
              .substring(0, 16)
          );
          setHost(val.host);
        } else {
          window.location.replace("/#/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Edit Event</h1>
      <label htmlFor="eventTitle">Title</label>
      <input
        type="text"
        id="eventTitle"
        placeholder="Title of Event"
        name="eventTitle"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label htmlFor="eventDescription">Event Description: </label>
      <textarea
        id="eventDescription"
        name="evetDescription"
        rows="5"
        cols="33"
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescr(e.target.value)}
      ></textarea>
      <label htmlFor="eventLocation">Location:</label>
      <input
        type="text"
        id="eventLocation"
        placeholder="Enter Event Location"
        name="eventLocation"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <label htmlFor="eventStartTime">Event Start</label>
      <input
        type="datetime-local"
        id="eventstartTime"
        placeholder="Enter Event Start Time"
        name="eventStartTime"
        value={timeStart}
        onChange={(e) => setTimeStart(e.target.value)}
      />
      <label htmlFor="eventEndTime">Event End</label>
      <input
        type="datetime-local"
        id="eventEndTime"
        placeholder="Enter Event End Time"
        name="eventEndTime"
        value={timeEnd}
        onChange={(e) => setTimeEnd(e.target.value)}
      />
      <br></br>

      <button
        type="submit"
        className="button"
        onClick={() => {
          editEvent(
            id,
            title,
            description,
            location,
            timeStart,
            timeEnd,
            host
          ).then((res) => {
            window.location.assign(`/#/event/${id}`);
          });
        }}
      >
        Submit
      </button>
    </div>
  );
}
