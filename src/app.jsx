import React, { Component } from "react";

import { Account, Dashboard, Header, Home, Welcome, Event } from "./components/exportPages";

import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import "./app.css";
import * as Styled from "./app.styled";

function App() {
  return (
    <HashRouter>
      <main>
        <div className="content">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/account" element={
              <>
                <Header></Header>
                <Account />
              </>
            } />
            <Route path="/dashboard" element={
              <>
                <Header></Header>
                <Dashboard />
              </>
            } />
            <Route path="/event/:id" element={
              <>
                <Header></Header>
                <Event />
              </>
            } />
          </Routes>
        </div>
      </main>
    </HashRouter>
  );
}

export default App;
