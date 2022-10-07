import React, { Component } from "react";

import { Account, Header, Home } from "./components/exportPages";

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
          </ul>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </main>
    </HashRouter>
  );
}

export default App;
