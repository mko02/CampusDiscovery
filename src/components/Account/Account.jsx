import { Component, React, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword
} from "../../firebase";
import "./Account.css";

export function Account() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [status, setStatus] = useState(0); // 0 is login, 1 is register
  const radioHandler = (status) => {
    setStatus(status);
  };
  const [user, loading, error] = useAuthState(auth);

  return (
    <div id="pageContainer">
      <h1>Account</h1>
      {status != 2 && (
        <>
          <label for="login" class="loginregisterLabel">
            <input
              type="radio"
              name="loginregister"
              value="login"
              id="login"
              checked={status === 0}
              onClick={(e) => radioHandler(0)}
            ></input>
            Login
          </label>
          <label for="register" class="loginregisterLabel">
            <input
              type="radio"
              name="loginregister"
              value="register"
              id="register"
              checked={status === 1}
              onClick={(e) => radioHandler(1)}
            ></input>
            Register
          </label>
        </>
      )}

      {status === 1 && (
        <>
          <p>Register an account</p>
          <label class="fieldLabel">Choose type of account</label>
          <label for="student">
            <input
              type="radio"
              id="student"
              name="accountType"
              value="student"
              checked={accountType === "Student"}
              onClick={(e) => setAccountType("Student")}
            ></input>
            Student
          </label>
          <label for="teacher">
            <input
              type="radio"
              id="teacher"
              name="accountType"
              value="teacher"
              checked={accountType === "Teacher"}
              onClick={(e) => setAccountType("Teacher")}
            ></input>
            Teacher
          </label>
          <label for="organizer">
            <input
              type="radio"
              id="organizer"
              name="accountType"
              checked={accountType === "Organizer"}
              onClick={(e) => setAccountType("Organizer")}
            ></input>
            Organizer
          </label>
          <br></br>
          <label class="fieldLabel" for="name">Name:</label>
          <i>
            Names can only be one or two words, with no special characters
            (besides one space)
          </i><br />
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label class="fieldLabel" for="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label class="fieldLabel">Password:</label>
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
          <p>Login</p>
          <label for="email" class="fieldLabel">Email:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label class="fieldLabel">Password:</label>
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
          <a href="#/dashboard">Continue to Dashboard</a>
        </>
      )}
    </div>
  );
}
