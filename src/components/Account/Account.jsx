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

      {status === 1 && (
        <>
          <p>Register an account</p>
          <input
            type="radio"
            id="student"
            name="accountType"
            value="student"
            checked={accountType === 1}
            onClick={(e) => setAccountType(1)}
          ></input>
          <label for="student">Student</label>
          <input
            type="radio"
            id="teacher"
            name="accountType"
            value="teacher"
            checked={accountType === 2}
            onClick={(e) => setAccountType(2)}
          ></input>
          <label for="teacher">Teacher</label>
          <input
            type="radio"
            id="organizer"
            name="accountType"
            checked={accountType === 3}
            onClick={(e) => setAccountType(3)}
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
            onClick={() =>
              registerWithEmailAndPassword(name, accountType, email, password)
            }
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
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <p id="loginstatus"></p>
        </>
      )}
    </div>
  );
}
