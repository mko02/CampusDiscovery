import { Component, React, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword
} from "../../firebase";
import * as Styled from "./Account.styled";

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
    <div>
      <h1>Account</h1>
      {status != 2 && (
        <>
          <input
            type="radio"
            name="loginregister"
            value="login"
            id="login"
            checked={status === 0}
            onClick={(e) => radioHandler(0)}
          ></input>
          <label for="login">Login</label>
          <input
            type="radio"
            name="loginregister"
            value="register"
            id="register"
            checked={status === 1}
            onClick={(e) => radioHandler(1)}
          ></input>
          <label for="register">Register</label>
        </>
      )}

      {status === 1 && (
        <>
          <p>Register an account</p>
          <input
            type="radio"
            id="student"
            name="accountType"
            value="student"
            checked={accountType === "Student"}
            onClick={(e) => setAccountType("Student")}
          ></input>
          <label for="student">Student</label>
          <input
            type="radio"
            id="teacher"
            name="accountType"
            value="teacher"
            checked={accountType === "Teacher"}
            onClick={(e) => setAccountType("Teacher")}
          ></input>
          <label for="teacher">Teacher</label>
          <input
            type="radio"
            id="organizer"
            name="accountType"
            checked={accountType === "Organizer"}
            onClick={(e) => setAccountType("Organizer")}
          ></input>
          <label for="organizer">Organizer</label>
          <br></br>
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <i>
            Names can only be one or two words, with no special characters
            (besides one space)
          </i>
          <br />
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password:</label>
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
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password:</label>
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
