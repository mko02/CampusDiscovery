import { React, useEffect, useState } from "react";
import {
  addRSVP,
  deleteRSVP,
  getEvent,
  getRSVP,
  getRSVPUser
} from "../../firebase";
import "./RSVP.css";

export function RSVP(props) {
  const [RSVPAvail, setRSVPAvail] = useState(1); // 1 availeble, 0 not
  const [RSVPErrorMsg, setErrorMsg] = useState("");
  const [RSVPStatus, setRSVPStatus] = useState("");
  const [RSVPNote, setRSVPNote] = useState("")

  useEffect(() => {
    getRSVPUser(props.eventID, props.uid).then((snap) => {
      if (snap.val() == null) {
      } else {
        setRSVPStatus(snap.val());
      }
    });

    getEvent(props.eventID).then((snap) => {
      if (snap.exists()) {
        var numAttending = 0;

        const value = snap.val();

        for (let user in value.users) {
          if (value.users[user].rsvpStatus === "Will Attend") {
            numAttending += 1;
          } else if (value.users[user].rsvpStatus === "Maybe") {
            numAttending += 1;
          }
        }
        if (value.inviteOnly) {
          if (value.invitedList) {
            if (props.uid in value.invitedList) {
              setRSVPNote("You're invited!")
              return;
            } else {
              setRSVPAvail(0);
              setErrorMsg("This event is invite-only.");
              return;
            }
          } else {
            setRSVPAvail(0);
            setErrorMsg("This event is invite-only.");
            return;
          }
        }

        if (value.capacity) {
          if (numAttending.toString() >= value.capacity) {
            if (RSVPStatus === "Will Attend" || RSVPStatus === "Maybe") {
              setRSVPAvail(1);
            } else {
              setRSVPAvail(0);
              setErrorMsg("This event is at capacity.");
            }
          } else {
            setRSVPAvail(1);
          }
        }
      }
    });
  }, []);

  function handleRSVPChange(status) {
    if (status == "None") {
      deleteRSVP(props.uid, props.eventID);
      setRSVPStatus("");
    } else {
      addRSVP(props.uid, props.eventID, status);
      setRSVPStatus(status);
    }
  }

  return (
    <div className="rsvp-container">
      <h2>RSVP</h2>
      {RSVPAvail === 1 && (
        <>
          {RSVPNote != "" && <i className="rsvpnote">{RSVPNote}</i>}
          {RSVPStatus != "" && (
            <div>
              <label className="rsvp-label-cancel">
                <input
                  type="radio"
                  name="cancel"
                  checked={RSVPStatus === "None"}
                  onChange={(e) => handleRSVPChange("None")}
                ></input>
                X
              </label>
            </div>
          )}
          <div className="rsvp-buttons-container">
            <label className="rsvp-label primary">
              <input
                type="radio"
                name="primary"
                checked={RSVPStatus === "Will Attend"}
                onChange={(e) => handleRSVPChange("Will Attend")}
              ></input>
              Attending
            </label>
            <label className="rsvp-label primary">
              <input
                type="radio"
                name="primary"
                checked={RSVPStatus === "Maybe"}
                onChange={(e) => handleRSVPChange("Maybe")}
              ></input>
              Unsure
            </label>
            <label className="rsvp-label primary">
              <input
                type="radio"
                name="primary"
                checked={RSVPStatus === "Not Attending"}
                onChange={(e) => handleRSVPChange("Not Attending")}
              ></input>
              Not Attending
            </label>
          </div>
        </>
      )}
      {RSVPAvail === 0 && (
        <div>
          <p>{RSVPErrorMsg}</p>
        </div>
      )}
    </div>
  );
}
