import React, { Component } from "react";

import { Account, Dashboard, Header, Home , Welcome} from "./components/exportPages";

import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import * as Styled from "./app.styled";

function App() {
  return (
    <HashRouter>
      <main>
        <Header></Header>
        <div>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="account">Account</NavLink>
            </li>
            <li>
              <NavLink to="dashboard">Dashboard</NavLink>
            </li>
          </ul>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </div>
      </main>
    </HashRouter>
  );
}

export default App;
