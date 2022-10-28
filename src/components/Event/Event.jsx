import { child, get, getDatabase, ref } from "firebase/database";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvent, getUser } from "../../firebase";
import "./Event.css";

export function Event() {
  const [title, setTitle] = useState("");
  const [description, setDescr] = useState("");
  const [timeStart, setStartTime] = useState("");
  const [timeEnd, setEndTime] = useState("");
  const [hostID, setHostID] = useState("");
  const [host, setHost] = useState("");


  const { id } = useParams();

  getEvent(id)
    .then((snap) => {
      if (snap.exists()) {
        const val = snap.val();
        setTitle(val.title);
        setDescr(val.description);

        let startTimeStr = new Date(val.timeStart * 1000 - new Date().getTimezoneOffset() * 60000).toLocaleString();

        let startTimeStrAMorPM = startTimeStr.substring(startTimeStr.length - 3);
        startTimeStr = startTimeStr.substring(0, startTimeStr.length - 6) + startTimeStrAMorPM;
        setStartTime(startTimeStr)

        let endTimeStr = new Date(val.timeEnd * 1000 - new Date().getTimezoneOffset() * 60000).toLocaleString();

        let endTimeStrAMorPM = endTimeStr.substring(endTimeStr.length - 3);
        endTimeStr = endTimeStr.substring(0, endTimeStr.length - 6) + endTimeStrAMorPM;

        setEndTime(endTimeStr);

        setHostID(val.host);

      } else {
        window.location.replace("/#/dashboard")
      }
    })
    .catch((error) => {
      console.log(error);
    });
  
  getUser(hostID)
    .then((snap) => {
      if (snap.exists()) {
        const val = snap.val()
        setHost(val.name)
      }
    })

  return (
    <div>
      <div className="button">
        <Link to="/dashboard">
          <svg width="30px" height = "30px">
            <g id="c185_triangle">
              <path fill="#FFFFFF"
                fillOpacity="1"
              d="M20.982,0.521v2.006L8.57,12.315c-0.121,0.101-0.195,0.251-0.195,0.41s0.074,0.311,0.195,0.41l12.412,9.79v2.005    c0,0.199-0.115,0.383-0.297,0.469c-0.178,0.086-0.395,0.064-0.549-0.061L4.664,13.136c-0.122-0.1-0.194-0.251-0.194-0.41    s0.072-0.31,0.194-0.41L20.136,0.113c0.154-0.126,0.371-0.148,0.549-0.061C20.866,0.139,20.982,0.322,20.982,0.521z"/>
            </g>
          </svg>
        </Link>
      </div>
      <h1>{title}</h1>
      <div>
        <p class="toLeft">Host: {host}</p>
        <p class="toLeft">Description: {description}</p>
        <p class="toLeft"> Start Time: {timeStart}</p>
        <p class="toLeft">End Time: {timeEnd}</p>
      </div>

    </div>
  );
}
