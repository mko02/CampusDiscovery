import { React, useState, useEffect, Button } from "react";
import { useParams} from "react-router-dom";
import { addRSVP, getRSVP, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./RSVPAdmin.css";

export function RSVPAdmin() {
    const [inviteStatus, setInviteStatus] = useState(""); //0 is not invite-only, 1 is invite-only
    const [hasLoaded, setLoaded] = useState(false);
    const [userID, setUserID] = useState("");
    const { id } = useParams();

    var willList = []
    var maybeList = []
    var wontList = []

    function getAttendeeList() {
        if (!hasLoaded) {
            willList = [];
            maybeList = [];
            wontList = [];
            getRSVP(id).then((snap) => {
                const value = snap.val();
                for (let user in value.users) {
                    if (value.users[user].equals("Will Attend")) {
                        willList.push(user);
                    } else if (value.users[user].equals("Maybe")) {
                        maybeList.push(user);
                    } else {
                        wontList.push(user);
                    }
                  }
            });
        }
    }

    useEffect(() => {
        getAttendeeList();
      }, []);

    return (
        <div className = "attendanceGrid">
            <div className = "column">
                
            </div>
            <div className = "column">
                
            </div>
            <div className = "column">
                
            </div> 
        </div>
    );
}