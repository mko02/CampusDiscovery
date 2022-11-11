import { React, useEffect, useState } from "react";
import { getInvited, getUser } from "../../firebase";
import "./RSVPInvite.css";

export function RSVPInvite(props) {
  const [email, setEmail] = useState("");
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const id = props.eventID;

  function handleInviteList() {
    console.log(email);
  }

  useEffect(() => {
    getInvitedUsers();
  }, []);

  function allDone(list) {
    setInvitedUsers(list);
    console.log(list);
  }
  function getInvitedUsers() {
    if (loaded) {
      return;
    }
    setLoaded(true);
    getInvited(id).then((snap) => {
      if (snap.exists()) {
        let invited = [];
        let counter = 0;
        for (let user in snap.val()) {
          getUser(user).then((userDetails) => {
            if (userDetails.exists()) {
              let val = userDetails.val();
              invited.push({ email: val.email, name: val.name });
            }
            if (counter == Object.keys(snap.val()).length - 1) {
              allDone(invited);
            }
            counter++;
          });
        }
      } else {
        return;
      }
    });
  }

  const renderInvitedUsers = invitedUsers.map(function (item, index) {
    return (
      <div
        className="canStrike rsvpNameList"
        key={index}
        onClick={() => {
          //deleteInvitedUser(item.uid, id)
          window.location.reload();
        }}
      >
        <span className="invitedUser inviteName">{item.name}</span>
        <span className="invitedUser inviteEmail">{item.email}</span>
      </div>
    );
  });

  return (
    <div className="rsvp-container invitedusers">
      <h1> Invited Users</h1>

      <label>email:</label>
      <input
        type="text"
        id="email"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleInviteList}>Invite</button>

      <hr></hr>

      {renderInvitedUsers}
    </div>
  );
}
