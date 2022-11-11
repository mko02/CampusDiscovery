import { React, useEffect, useState } from "react";
import { addRSVP, getEvent, getRSVP, addInvitedUser} from "../../firebase";
//import "./RSVPInvite.css";


export function RSVPInvite(props) {

    const [email, setEmail] = useState("");

    function handleInviteList() {
        console.log(email)
    }

    


    return (
        <>
            <h1> Invited Users</h1>

            <label>email:</label>
            <input 
                type="text" 
                id="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={handleInviteList}>
                Invite
            </button>
        </>

    );

}
