import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { checkEditPermission, editEvent, getEvent } from "../../firebase";
import "./EditEvent.css";

export function EditEvent() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescr] = useState("");
  const [location, setLocation] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [host, setHost] = useState("");
  const [inviteOnly, setInviteOnly] = useState(false);
  const [capacity, setCapacity] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getEvent(id)
      .then((snap) => {
        if (snap.exists()) {
          const val = snap.val();
          checkEditPermission(id);
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
          if (!val.inviteOnly) {
            setInviteOnly(false);
          } else {
            setInviteOnly(val.inviteOnly);
          }
          if(val.capacity){
            setCapacity(val.capacity);
          } else {
            setCapacity("");
          }
          
          setUsers(val.users);
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
      <div>
        <div className="backButton">
          <Link to={`/event/${id}`}>
            <svg width="30px" height="30px">
              <g id="c185_triangle">
                <path
                  fill="#FFFFFF"
                  fillOpacity="1"
                  d="M20.982,0.521v2.006L8.57,12.315c-0.121,0.101-0.195,0.251-0.195,0.41s0.074,0.311,0.195,0.41l12.412,9.79v2.005    c0,0.199-0.115,0.383-0.297,0.469c-0.178,0.086-0.395,0.064-0.549-0.061L4.664,13.136c-0.122-0.1-0.194-0.251-0.194-0.41    s0.072-0.31,0.194-0.41L20.136,0.113c0.154-0.126,0.371-0.148,0.549-0.061C20.866,0.139,20.982,0.322,20.982,0.521z"
                />
              </g>
            </svg>
          </Link>
        </div>
      </div>
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
      <label htmlFor="inviteOnly">Invite Only</label>
      <div>
        <input
          type="checkbox"
          checked={inviteOnly}
          onChange={(e) => setInviteOnly(!inviteOnly)}
        />
      </div>
      <label htmlFor="eventCapacity">
        Guest Capacity (leave blank or 0 for no capacity)
      </label>
      <input
        type="number"
        id="eventCapacity"
        placeholder="Guest Capacity"
        name="eventCapacity"
        defaultValue={capacity}
        onChange={(e) => setCapacity(e.target.value)}
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
            host,
            inviteOnly,
            capacity,
            users
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
