import { React, useState } from "react";
import {addInvitedUser, getAllUsers, getInvitedList} from "../../firebase";
//import "./RSVPInvite.css";


export function RSVPInvite(props) {

    const [addEmail, setAddEmail] = useState("");

    function handleInviteList() {

        getAllUsers().then((snap) => {
            var userList = snap.val()

            for (let user in userList) {
                if (userList[user]["email"] === addEmail) {
    
                    addInvitedUser(user, props.eventID)
                    break;
                }
            }

            window.location.reload()

        })

    }

    return (
        <>
            <h1> Invited Users</h1>

            <label>email:</label>
            <input 
                type="text" 
                id="email"
                onChange={(e) => setAddEmail(e.target.value)}
            />

            <button onClick={handleInviteList}>
                Invite
            </button>
        </>

    );

}
