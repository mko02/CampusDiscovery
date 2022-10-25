import React, { Component } from "react";

import { Account, CreateEvent, Dashboard, Event, Header, Home, Welcome } from "./components/exportPages";

import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import "./app.css";

function App() {
  return (
    <HashRouter>
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/account"
            element={
              <>
                <Header></Header>
                <div className="content">
                  <Account />
                </div>
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Header></Header>
                <div className="content">
                  <Dashboard />
                </div>
              </>
            }
          />
          <Route
            path="/event/:id"
            element={
              <>
                <Header></Header>
                <div className="content">
                  <Event />
                </div>
              </>
            }
          />
          <Route
            path="/CreateEvent"
            element={
              <>
                <Header></Header>
                <CreateEvent />
              </>
            }
          />
        </Routes>
        <svg
          className="waves"
          id="wave1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#20242B"
            fillOpacity="1"
            d="M0,160L20,154.7C40,149,80,139,120,144C160,149,200,171,240,197.3C280,224,320,256,360,261.3C400,267,440,245,480,234.7C520,224,560,224,600,234.7C640,245,680,267,720,240C760,213,800,139,840,128C880,117,920,171,960,202.7C1000,235,1040,245,1080,245.3C1120,245,1160,235,1200,224C1240,213,1280,203,1320,213.3C1360,224,1400,256,1420,272L1440,288L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
          ></path>
        </svg>

        <svg
          className="waves"
          id="wave2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#1a1e24"
            fillOpacity="1"
            d="M0,32L34.3,69.3C68.6,107,137,181,206,176C274.3,171,343,85,411,48C480,11,549,21,617,69.3C685.7,117,754,203,823,218.7C891.4,235,960,181,1029,170.7C1097.1,160,1166,192,1234,192C1302.9,192,1371,160,1406,144L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </main>
    </HashRouter>
  );
}

export default App;
