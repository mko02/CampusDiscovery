import { React, useState, useEffect, Button } from "react";
import { useParams} from "react-router-dom";
import { addRSVP, getRSVP } from "../../firebase";

export function RSVPAdmin() {
    const [inviteStatus, setInviteStatus] = useState(""); //0 is not invite-only, 1 is invite-only
    const [hasLoaded, setLoaded] = useState(false);
    const { id } = useParams();

    var attendeeList = [];

    function getAttendeeList() {
        if (!hasLoaded) {
            getRSVP(id).then((snap) => {
                console.log(snap);
              });
        }
    }

    useEffect(() => {
        getAttendeeList();
      }, []);

    return (
        <div>
            <button onClick = {() => addRSVP(id)}>
                click
            </button>
            
        </div>
    );

}