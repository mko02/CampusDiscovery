import { React, useEffect, useState } from "react";
import { addRSVP, getRSVP, getRSVPUser } from "../../firebase";
import "./RSVP.css";

export function RSVP(props) {
  const [RSVPAvail, setRSVPAvail] = useState(1); // 1 availeble, 0 not
  const [RSVPErrorMsg, setErrorMsg] = useState("");
  const [RSVPStatus, setRSVPStatus] = useState("");

  useEffect(() => {
    getRSVPUser(props.eventID, props.uid).then((snap) => {
      if (snap.val() == null) {
      } else {
        setRSVPStatus(snap.val());
      }
    })
    //setErrorMsg("This event is invite-only.")
  }, []);

  function handleRSVPChange(status) {
    addRSVP(props.uid, props.eventID, status)
    setRSVPStatus(status);
  }

  return (
    <div className="rsvp-container">
      <h2>RSVP</h2>
      {RSVPAvail === 1 && (
        <div className="rsvp-buttons-container">
          <label className="rsvp-label">
            <input
              type="radio"
              name="attending"
              checked={RSVPStatus === "Will Attend"}
              onChange={(e) => handleRSVPChange("Will Attend")}
            ></input>
            Attending
          </label>
          <label className="rsvp-label">
            <input
              type="radio"
              name="unsure"
              checked={RSVPStatus === "Maybe"}
              onChange={(e) => handleRSVPChange("Maybe")}
            ></input>
            Unsure
          </label>
          <label className="rsvp-label">
            <input
              type="radio"
              name="notattending"
              checked={RSVPStatus === "Not Attending"}
              onChange={(e) => handleRSVPChange("Not Attending")}
            ></input>
            Not Attending
          </label>
        </div>
      )}
      {RSVPAvail === 0 && <div>
        <p>{RSVPErrorMsg}</p></div>}
    </div>
  );
}
