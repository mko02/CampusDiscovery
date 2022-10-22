import { child, get, getDatabase, ref } from "firebase/database";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../firebase";

export function Event() {
  const [title, setTitle] = useState("");
  const [description, setDescr] = useState("");

  const { id } = useParams();

  getEvent(id)
    .then((snap) => {
      if (snap.exists()) {
        const val = snap.val();
        setTitle(val.title);
        setDescr(val.description);
      } else {
        window.location.assign("/#/dashboard")
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div>
      <h1>Event:</h1>
      <h2>Title: {title}</h2>
      <p>Description: {description}</p>
    </div>
  );
}
