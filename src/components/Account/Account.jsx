import { onAuthStateChanged } from "firebase/auth";
import { React, useEffect, useState } from "react";
import {
  auth,
  checkLoggedIn,
  getEvent,
  getRSVPEvents,
  getUser,
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword
} from "../../firebase";
import { EventCard } from "../EventCard/EventCard";
import "./Account.css";

export function Account() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState("User");
  const [status, setStatus] = useState(0); // 0 is login, 1 is register
  const [infoType, setInfoType] = useState("");
  const [infoName, setInfoName] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [userID, setUserID] = useState("");
  const radioHandler = (status) => {
    setStatus(status);
  };

  onAuthStateChanged(auth, (user) => {
    if (user && status == 0) {
      setStatus(3);
      getUser(user.uid).then((res) => {
        const value = res.val();
        setUserID(user.uid);
        setInfoType(value.accountType);
        setInfoName(value.name);
        setDisplayEmail(value.email);
      });
    }
  });

  const [events, setEvents] = useState([]);
  const [hasLoaded, setLoaded] = useState(false);
  const displayEvents = events.map(function (obj, i) {
    if (checkConflicts(events, obj)) {
      return (
        <a className="gridCard" key={obj.key} href={`/#/event/${obj.key}?from=account`}>
          <EventCard event={obj.data} color={"red"} />
        </a>
      );
    } else {
      return (
        <a className="gridCard" key={obj.key} href={`/#/event/${obj.key}?from=account`}>
          <EventCard event={obj.data} />
        </a>
      );
    }
  });

  var eventList = [];

  useEffect(() => {
    checkLoggedIn();
    getEvents(userID);
  }, [userID]);

  function getEvents(userID) {
    if (!hasLoaded && userID != "") {
      getRSVPEvents(userID).then((snap) => {
        eventList = [];
        const value = snap.val();
        let counter = 0;
        for (let event in value) {
          // Note any "Not-Attending statuses will not show up in AccountEvents"
          if (value[event].rsvpStatus == "Not Attending") {
            continue;
          }
          getEvent(event).then((eventDetails) => {
            if (eventDetails.exists()) {
              eventList.push({ key: event, data: eventDetails.val() });
            }
            eventList.sort((a, b) => b.data.timeStart - a.data.timeStart);
            if (counter == Object.keys(value).length - 1) {
              return finalizeEvents(eventList);
            }
            counter++;
          });
        }
      });
    }
  }

  function finalizeEvents(eventList) {
    setEvents(eventList);
    setLoaded(true);
  }

  function checkConflicts(events, event) {
    let index = 0;

    while (index < events.length) {
      if (event.key != events[index].key) {
        const eventStart = event.data.timeStart;
        const eventEnd = event.data.timeEnd;
        const startTime = events[index].data.timeStart;
        const endTime = events[index].data.timeEnd;
        if (
          (eventStart >= startTime && eventStart <= endTime) ||
          (eventEnd >= startTime && eventEnd <= endTime) ||
          (startTime >= eventStart && startTime <= eventEnd) ||
          (endTime >= eventStart && endTime <= eventEnd)
        ) {
          return true;
        }
      }
      index++;
    }
    return false;
  }

  return (
    <div id="pageContainer">
      {status < 2 && (
        <>
          <label htmlFor="login" className="loginregisterLabel">
            <input
              type="radio"
              name="loginregister"
              value="login"
              id="login"
              checked={status === 0}
              onChange={(e) => radioHandler(0)}
            ></input>
            Login
          </label>
          <label htmlFor="register" className="loginregisterLabel">
            <input
              type="radio"
              name="loginregister"
              value="register"
              id="register"
              checked={status === 1}
              onChange={(e) => radioHandler(1)}
            ></input>
            Register
          </label>
        </>
      )}

      {status === 1 && (
        <>
          <h3 className="accountHeader">Register a new account</h3>
          <label className="fieldLabel">Choose type of account</label>
          <label htmlFor="user" className="radiospan">
            <input
              type="radio"
              id="user"
              name="accountType"
              value="user"
              checked={accountType === "User"}
              onChange={(e) => setAccountType("User")}
            ></input>
            <span>
              <svg
                className="radiosvg"
                width="80px"
                height="80px"
                viewBox="0 0 700 700"
              >
                <path
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                  d="m350 14.004c32.41 0 61.809 13.168 83.121 34.461 22.125 22.125 34.512 51.867 34.512 83.176 0 32.422-13.176 61.828-34.488 83.148-21.258 21.312-50.672 34.488-83.148 34.488-32.477 0-61.891-13.176-83.176-34.461-22.199-24.141-34.461-49.824-34.461-83.176 0-32.41 13.168-61.809 34.461-83.121 22.125-22.125 51.867-34.512 83.176-34.512zm-41.668 258.09h83.34c48.914 0 93.398 20.016 125.62 52.238 33.535 36.473 52.246 75.195 52.246 125.62v0.125c0 26.383-10.801 50.379-28.172 67.75-17.391 17.391-41.371 28.176-67.758 28.176h-247.23c-26.383 0-50.367-10.789-67.758-28.176-17.367-17.367-28.172-41.367-28.172-67.75 0-47.359 18.777-92.23 52.238-125.7 33.43-33.43 78.312-52.285 125.63-52.285zm83.34 28.004h-83.34c-41.227 0-78.711 16.852-105.87 43.992-27.145 27.164-43.996 64.641-43.996 105.86 0 18.129 7.1367 35.266 19.957 48.086 12.316 12.316 29.301 19.961 47.965 19.961h247.23c18.664 0 35.652-7.6445 47.965-19.961 12.301-12.301 19.957-29.293 19.957-47.961 0-38.031-15.988-79.793-44.031-105.95-27.156-27.156-64.633-44.023-105.84-44.023zm21.715-231.9c-16.18-16.184-38.586-26.191-63.383-26.191s-47.207 10.008-63.383 26.191c-16.906 16.906-26.246 39.535-26.246 63.438 0 24.473 9.75 46.617 25.559 62.742 18.578 17.328 38.211 26.887 64.07 26.887 24.758 0 47.18-10.039 63.383-26.246 16.238-16.18 26.246-38.586 26.246-63.383 0-23.902-9.3398-46.531-26.246-63.438z"
                />
              </svg>
              User
            </span>
          </label>
          <label htmlFor="organization" className="radiospan">
            <input
              type="radio"
              id="organization"
              name="accountType"
              value="organization"
              checked={accountType === "Organization"}
              onChange={(e) => setAccountType("Organization")}
            ></input>
            <span>
              <svg
                className="radiosvg"
                width="80px"
                height="80px"
                viewBox="0 0 700 700"
              >
                <path
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                  d="m553.28 346.64c-8.9609 0-16.801 1.6797-24.641 5.0391l-108.64-125.44c10.641-14.559 17.359-32.48 17.359-51.52 0-48.16-39.199-87.359-87.359-87.359s-87.359 39.199-87.359 87.359c0 19.602 6.7188 36.961 17.359 51.52l-108.08 126c-7.8398-3.3594-16.238-5.0391-24.641-5.0391-34.719 0-62.719 28-62.719 62.719s28 62.719 62.719 62.719 62.719-28 62.719-62.719c0-11.762-3.3594-22.961-9.5195-32.48l109.2-126c6.7188 3.9219 14 6.7188 21.84 8.3984v90.16c-25.199 7.8398-43.68 31.359-43.68 59.359 0 34.719 28 62.719 62.719 62.719s62.719-28 62.719-62.719c0-28-18.48-51.52-43.68-59.359l0.003906-90.156c7.8398-1.6797 15.121-4.4805 21.84-8.3984l108.64 125.44c-5.6016 9.5195-9.5195 20.719-9.5195 32.48 0 34.719 28 62.719 62.719 62.719s62.719-28 62.719-62.719c0-34.164-28-62.723-62.719-62.723zm-203.28-221.2c26.879 0 49.281 21.84 49.281 49.281 0 27.438-21.84 49.277-49.281 49.277s-49.281-21.84-49.281-49.281c0-27.438 22.402-49.277 49.281-49.277zm-203.28 309.12c-13.441 0-24.641-11.199-24.641-24.641 0-13.441 11.199-24.641 24.641-24.641s24.641 11.199 24.641 24.641c0 13.441-11.199 24.641-24.641 24.641zm203.28 0c-13.441 0-24.641-11.199-24.641-24.641 0-13.441 11.199-24.641 24.641-24.641s24.641 11.199 24.641 24.641c0 13.441-10.641 24.641-24.641 24.641zm203.28 0c-13.441 0-24.641-11.199-24.641-24.641 0-13.441 11.199-24.641 24.641-24.641s24.641 11.199 24.641 24.641c0 13.441-11.203 24.641-24.641 24.641z"
                />
              </svg>
              Organization
            </span>
          </label>
          <label htmlFor="admin" className="radiospan">
            <input
              type="radio"
              id="admin"
              name="accountType"
              checked={accountType === "Administrator"}
              onChange={(e) => setAccountType("Administrator")}
            ></input>
            <span>
              <svg
                className="radiosvg"
                width="70px"
                height="80px"
                viewBox="0 0 700 700"
              >
                <path
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                  d="m638.4 413.4-9.9375 18.23c-29.875-10.164-63.926 0.55859-81.789 28.25-5.4609 8.3984-8.793 17.5-10.332 26.77h-0.027344l-25.312-0.39453c-3.1914-18.758-13.719-36.176-30.969-47.32-18.172-11.73-39.621-13.746-58.828-7.8672l-10.305-18.73c14.031-12.879 22.961-31.191 22.961-51.715 0-21.309-9.6328-40.184-24.613-53.09l11.984-20.859c7.0312 2.3789 14.449 3.9492 22.262 3.9492 33.965 0 62.301-24.055 68.938-56.031 7.5039-0.027344 15.453-0.082031 23.125-0.10938 6.582 32.031 34.945 56.141 68.965 56.141 8.3711 0 16.27-1.7109 23.715-4.3984l11.676 20.355c-15.621 12.91-25.758 32.199-25.758 54.043 0 21.137 9.5195 39.871 24.246 52.777m54.32-14.84c2.5781 9.4375-0.8125 17.164-2.3789 20.078l-27.777 50.035c-1.3438 2.4922-3.1055 4.7891-5.2617 6.7773-5.6289 5.1484-12.012 6.4922-14.504 6.8281-3.3906 0.47656-6.5234 0.19922-8.9062-0.27734l-21.949-5.7969c-1.2617-0.11328-1.8477 0.11328-2.2148 0.28125l-4.8711 2.9102-21.699 13.609-1.1758 1.9023-4.0586 17.418c-0.25391 2.3516-1.9336 9.1836-7.9805 14.895-7.0312 6.6367-15.344 7.3359-18.594 7.3359l-57.512-1.0078c-2.8281-0.027343-5.6562-0.53125-8.3984-1.4844-6.9453-2.4062-11.035-7.0273-12.852-9.5742-1.7109-2.3242-3.082-5.0391-3.9492-8.0352l-5.207-22.094c-0.44922-1.0352-0.89844-1.4844-1.2617-1.7656l-14.645-9.9375-6.7188-3.4727-0.11328 0.027344-2.2656-0.054688-17.082 5.2344c-0.92188 0.53125-9.9102 2.7148-16.941 0.58984-9.3789-2.7734-14.195-9.7734-15.816-12.656l-27.891-49.926c-1.3438-2.3516-2.4062-5.207-2.9375-8.0898-1.3477-7.0859 0.53125-12.91 1.7617-15.766 1.2617-2.8281 2.9414-5.3203 4.9844-7.5312l16.547-15.625c0.67188-0.86719 0.8125-1.5664 0.89844-2.0156l0.14062-2.4062-1.2891-23.465-1.0938-1.9609-13.215-12.012c-4.0898-3.0234-7.6445-8.3438-9.1289-14.281-2.4336-9.6016 1.1758-17.246 2.8281-20.102l28.73-49.422c1.4531-2.4922 3.2734-4.7578 5.457-6.6641 5.4336-4.8164 11.426-6.1602 14.531-6.4961 2.5781-0.36328 6.1055-0.22266 9.1016 0.47656l21.699 6.2461c1.3438 0.054688 1.8477-0.11328 2.1836-0.28125l15.793-7.9258 6.3008-4.2539 1.1758-1.9336 3.75-17.5c0.58984-5.0664 3.3633-10.809 7.7578-15.062 7.0859-6.918 15.512-7.6445 18.816-7.6445h57.23c2.8555 0 5.6836 0.41797 8.375 1.3164 6.9141 2.2969 11.086 6.8047 12.961 9.2969 1.8477 2.4336 3.2227 5.1523 4.1719 8.0625l5.5469 21.953c0.41797 1.0352 0.94922 1.5117 1.3164 1.7617l9.5742 6.2734 14.559 6.3828 16.996-6.1016c1.9609-1.0078 10.191-2.8867 16.969-1.0391 6.5508 1.7383 12.461 6.1328 16.102 12.098l29.316 49.223c1.4844 2.4648 2.5742 5.1523 3.1641 7.9805 1.5938 7.1406-0.16797 13.02-1.3438 15.875-1.1797 2.8594-2.8008 5.4609-4.8477 7.7305l-15.984 15.961c-0.61719 0.92187-0.75781 1.5664-0.8125 2.0156l-0.70312 17.668 0.67578 7.6133 1.0898 1.9609 13.469 11.734c2.0156 1.3984 7.2227 6.1016 9.4062 14.109zm-331.9-364.8c42.98 40.543 38.109 99.848 37.297 108.11-4.3398 44.41-29.82 72.914-41.691 85.793-16.156 17.586-43.766 47.574-84.309 47.797h-0.41797c-40.91 0-69.02-30.465-85.008-47.797-11.762-12.738-37.352-41.27-41.723-85.793-0.78125-8.2578-5.625-67.562 37.297-108.11 23.828-22.512 56.559-33.742 89.293-33.742 32.73 0 65.465 11.23 89.262 33.742zm-10.078 103.46c0.44922-4.4531 3.5273-44.215-22.598-68.855-13.969-13.215-34.578-20.773-56.586-20.773-22.008 0-42.645 7.5586-56.617 20.773-26.066 24.641-23.016 64.402-22.566 68.855 2.8555 29.539 20.719 48.887 29.285 58.152 15.793 17.109 31.5 32.453 50.039 32.453 19.992-0.11328 37.156-18.758 49.699-32.395 8.5938-9.3242 26.461-28.758 29.344-58.211zm-21.465 349.74c13.074 0 23.801 10.75 23.801 23.801 0 13.047-10.727 23.77-23.773 23.797-103.29 0-206.61-0.027344-309.93-0.027344-0.98047 0-10.809-0.22266-16.242-8.2305-3.1094-4.5664-3.1914-9.2969-3.1367-11.227 2.6602-23.941 12.434-83.359 58.324-140.2 42.98-53.199 94.949-76.102 121.35-85.316 1.7109-0.58594 3.3906-0.89453 5.0977-0.89453 2.8281 0 5.6289 0.83984 8.1211 2.4922 13.297 8.875 40.012 23.352 76.297 23.969 1.1484 0.027344 2.3555 0.027344 2.3555 0.027344 5.7109 0 10.582-0.39063 14.473-0.86719 12.965-1.625 24.977 7.6992 26.602 20.664 1.5977 12.629-7.3086 24.219-19.797 26.293-6.8867 0.78125-13.832 1.5117-21.277 1.5117l-3.2227-0.03125c-36.176-0.61328-65.574-11.395-86.77-22.875-25.957 11.031-58.465 30.605-86.188 64.934-22.957 28.418-35.168 58.129-41.66 82.18zm195.84-164.57c-19.934 0-36.09 16.156-36.09 36.09 0 19.91 16.156 36.066 36.09 36.066 19.91 0 36.066-16.156 36.066-36.066 0-19.934-16.156-36.09-36.066-36.09z"
                  fillRule="evenodd"
                />
              </svg>
              Administrator
            </span>
          </label>
          <label className="fieldLabel" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label className="fieldLabel" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="fieldLabel">Password:</label>
          <input
            type="password"
            name="name"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <button
            id="register"
            onClick={() => {
              registerWithEmailAndPassword(
                name,
                accountType,
                email,
                password
              ).then((val) => {
                if (val == 2) {
                  setStatus(2);
                }
              });
            }}
          >
            Register
          </button>
          <p id="registerstatus"></p>
        </>
      )}
      {status === 0 && (
        <>
          <h3 className="accountHeader">Login</h3>
          <label htmlFor="email" className="fieldLabel">
            Email:
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="fieldLabel">Password:</label>
          <input
            type="password"
            name="name"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <button
            id="login"
            onClick={() => {
              let ret = logInWithEmailAndPassword(email, password);
            }}
          >
            Login
          </button>
          <p id="loginstatus"></p>
        </>
      )}
      {status === 2 && (
        <>
          <h2>Account created</h2>
          <p>Your name: {name}</p>
          <p>Role type: {accountType}</p>
          <a href="#/dashboard" className="btn">
            Continue to Dashboard
          </a>
        </>
      )}
      {status === 3 && (
        <>
          <div className="accountHeader">
            <div className="infoCard">
              <p className="infoText">{infoName}</p>
              <p className="infoText">{infoType}</p>
              <p className="infoText">{displayEmail}</p>
            </div>
          </div>
          <a href="#/dashboard" className="btn">
              Continue to Dashboard
            </a>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          <div id="longline"></div>
          <h2>Your Events:</h2>
          <div className="gridContainer">{displayEvents}</div>
          <br></br>
        </>
      )}
    </div>
  );
}
