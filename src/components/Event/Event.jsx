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
      <div className = "header">
        <div className="backButton">
          <Link to = "/dashboard">
            <svg width="30px" height = "30px">
              <g id="c185_triangle">
                <path fill="#FFFFFF"
                  fillOpacity="1"
                d="M20.982,0.521v2.006L8.57,12.315c-0.121,0.101-0.195,0.251-0.195,0.41s0.074,0.311,0.195,0.41l12.412,9.79v2.005    c0,0.199-0.115,0.383-0.297,0.469c-0.178,0.086-0.395,0.064-0.549-0.061L4.664,13.136c-0.122-0.1-0.194-0.251-0.194-0.41    s0.072-0.31,0.194-0.41L20.136,0.113c0.154-0.126,0.371-0.148,0.549-0.061C20.866,0.139,20.982,0.322,20.982,0.521z"/>
              </g>
            </svg>
          </Link>
        </div>
        <h1 className="eventPageTitle">{title}</h1>
        <div className = "editButton">
          <Link to = {`/editevent/${id}`}>
              <svg width="30px" height = "30px" viewBox="0 0 700 580">
                <g id="">
                  <path fill="#FFFFFF"
                    fillOpacity="1"
                  d="m618.24 100.24c0-23.52-8.9609-45.922-25.762-62.719-16.801-16.801-39.199-25.762-62.719-25.762-23.52 0-45.922 8.9609-62.719 25.762l-332.64 332.08-47.598 143.92c-4.4805 17.922 11.762 34.16 29.68 29.68l143.36-48.16 332.08-332.08c17.363-16.801 26.32-38.641 26.32-62.723zm-390.88 301.84c-14-14-30.238-23.52-48.16-29.121l269.92-269.92 77.281 77.281-269.92 270.48c-5.6016-18.48-15.68-34.723-29.121-48.723zm-66.078 1.1211c32.48 6.7188 58.238 32.48 65.52 65.52l-85.121 33.602c-7.8398 2.2383-15.121-5.0391-12.879-12.879zm389.2-246.4-77.281-77.281 17.922-17.922c21.281-21.281 56-21.281 77.281 0s21.281 56 0 77.281z"/>
                </g>
              </svg>
          </Link>
        </div>
      </div>
      
      <div>
        <p class="toLeft">Host: {host}</p>
        <p class="toLeft">Description: {description}</p>
        <p class="toLeft"> Start Time: {timeStart}</p>
        <p class="toLeft">End Time: {timeEnd}</p>
      </div>
    </div>
  );
}
