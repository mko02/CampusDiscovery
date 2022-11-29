import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  auth, checkLoggedIn, getEvent,
  getUser,
  removeEvent
} from "../../firebase";
import { RSVP } from "../RSVP-user/RSVP";
import { RSVPAdmin } from "../RSVPAdmin/RSVPAdmin";
import { RSVPInvite } from "../RSVPInvite/RSVPInvite";
import "./Event.css";

export function Event() {
  const [title, setTitle] = useState("");
  const [description, setDescr] = useState("");
  const [location, setLocation] = useState("");
  const [timeStart, setStartTime] = useState("");
  const [timeEnd, setEndTime] = useState("");
  const [hostID, setHostID] = useState("");
  const [host, setHost] = useState("");
  const [userID, setUserID] = useState("");
  const [userHost, setUserHost] = useState(false);
  const [userType, setUserType] = useState("");
  const [currentAttending, setCurrentAttending] = useState(0);
  const [inviteOnly, setInviteOnly] = useState(false);
  const [capacity, setCapacity] = useState(0);
  const { id } = useParams();
  
  let from = window.location.hash.split("=")[1];
  let link = "";
  if (from == "map") {
    link = "/map"
  } else {
    link = "/dashboard"
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  getEvent(id)
    .then((snap) => {
      if (snap.exists()) {
        const val = snap.val();
        setTitle(val.title);
        setDescr(val.description);
        setLocation(val.location);
        let startTimeStr = new Date(val.timeStart * 1000).toLocaleString();

        let startTimeStrAMorPM = startTimeStr.substring(
          startTimeStr.length - 3
        );
        startTimeStr =
          startTimeStr.substring(0, startTimeStr.length - 6) +
          startTimeStrAMorPM;
        setStartTime(startTimeStr);

        let endTimeStr = new Date(val.timeEnd * 1000).toLocaleString();

        let endTimeStrAMorPM = endTimeStr.substring(endTimeStr.length - 3);
        endTimeStr =
          endTimeStr.substring(0, endTimeStr.length - 6) + endTimeStrAMorPM;

        setEndTime(endTimeStr);
        setCapacity(val.capacity)
        setInviteOnly(val.inviteOnly)
        setHostID(val.host);
        

        var numAttending = 0;

        for (let user in val.users) {
          if (val.users[user].rsvpStatus === "Will Attend") {
            numAttending += 1;
          } else if (val.users[user].rsvpStatus === "Maybe") {
            numAttending += 1;
          }
        }

        setCurrentAttending(numAttending);

        if (val.capacity) {
          setCapacity(val.capacity);

        } else {
          setCapacity(0);
        }


      } else {
        window.location.replace("/#/dashboard");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  getUser(hostID).then((snap) => {
    if (snap.exists()) {
      const val = snap.val();
      setHost(val.name);
    }
  });


  onAuthStateChanged(auth, (user) => {
    setUserID(user.uid)

    getUser(userID).then((snap) => {
      if (snap.exists()) {
        setUserType(snap.val().accountType);
      }
    });

    if (userID === hostID || userType === "Administrator") {
      setUserHost(true);
    } else {
      setUserHost(false);
    }
  });

  return (
    <div>
      <div className="header">
        <div className="backButton">
          <Link to={link}>
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
        <h1 className="eventPageTitle">{title}</h1>
        <>
        {
          userHost &&
          <Link to={`/editevent/${id}`}>
            <div className="editButton">
              <svg width="30px" height="30px" viewBox="0 0 700 580">
                <g id="">
                  <path
                    fill="#FFFFFF"
                    fillOpacity="1"
                    d="m618.24 100.24c0-23.52-8.9609-45.922-25.762-62.719-16.801-16.801-39.199-25.762-62.719-25.762-23.52 0-45.922 8.9609-62.719 25.762l-332.64 332.08-47.598 143.92c-4.4805 17.922 11.762 34.16 29.68 29.68l143.36-48.16 332.08-332.08c17.363-16.801 26.32-38.641 26.32-62.723zm-390.88 301.84c-14-14-30.238-23.52-48.16-29.121l269.92-269.92 77.281 77.281-269.92 270.48c-5.6016-18.48-15.68-34.723-29.121-48.723zm-66.078 1.1211c32.48 6.7188 58.238 32.48 65.52 65.52l-85.121 33.602c-7.8398 2.2383-15.121-5.0391-12.879-12.879zm389.2-246.4-77.281-77.281 17.922-17.922c21.281-21.281 56-21.281 77.281 0s21.281 56 0 77.281z"
                  />
                </g>
              </svg>
            </div>
          </Link>
        }
        </>
        <>
        {
          userHost &&
          <Link to = "/dashboard">
            <div className = "deleteButton" onClick = {() => removeEvent(id)}> 
                <svg width="30px" height = "30px" viewBox="0 0 700 630">
                  <g id="">
                    <path fill="#FFFFFF"
                      fillOpacity="1"
                    d="m495.6 95.199h-100.8v-11.199c0-12.32-10.078-22.398-22.398-22.398h-39.199c-12.32 0-22.398 10.078-22.398 22.398v11.199h-100.8c-12.32 0-22.398 10.078-22.398 22.398v11.199c0 10.387 7.1953 19.105 16.832 21.609l-0.035156 319.99c0 12.32 10.078 22.398 22.398 22.398h252c12.32 0 22.398-10.078 22.398-22.398l0.003907-320c9.6133-2.5156 16.801-11.223 16.801-21.598v-11.199c0-12.32-10.078-22.402-22.398-22.402zm-168-11.199c0-3.0352 2.5664-5.6016 5.6016-5.6016h39.199c3.0352 0 5.6016 2.5664 5.6016 5.6016v11.199h-50.398zm156.8 386.4c0 3.0352-2.5664 5.6016-5.6016 5.6016h-252c-3.0352 0-5.6016-2.5664-5.6016-5.6016l0.035156-319.2h263.16zm16.801-341.6c0 3.0352-2.5664 5.6016-5.6016 5.6016l-285.6-0.003906c-3.0352 0-5.6016-2.5664-5.6016-5.6016v-11.199c0-3.0352 2.5664-5.6016 5.6016-5.6016h285.6c3.0352 0 5.6016 2.5664 5.6016 5.6016z"/>
                  </g>
                </svg>
            </div>  
          </Link>
        }  
        </>
      </div>

      <div>
        <p className="toLeft">Host: {host}</p>
        <p className="toLeft">Description: {description}</p>
        <p className="toLeft">Location: {location}</p>
        <p className="toLeft"> Start Time: {timeStart}</p>
        <p className="toLeft">End Time: {timeEnd}</p>
        <p className="toLeft">Current Attending: {currentAttending} </p>
        {(capacity > 0) && <p className="toLeft">Capacity: {capacity}</p>}
      </div>

      { userHost && (<RSVPAdmin eventID={id}/>)}
      { userHost && inviteOnly && (<RSVPInvite eventID={id} />)}

      {userID && !userHost && <RSVP uid={userID} eventID={id} />}

    </div>
  );
}
