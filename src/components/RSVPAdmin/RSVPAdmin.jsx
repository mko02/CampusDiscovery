import { onAuthStateChanged } from "firebase/auth";
import { Button, React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRSVP, getUser } from "../../firebase";
import "./RSVPAdmin.css";

export function RSVPAdmin() {
    const [inviteStatus, setInviteStatus] = useState(""); //0 is not invite-only, 1 is invite-only
    const [hasLoaded, setLoaded] = useState(false);
    const [ will, setWill ] = useState([]);
    const [ maybe, setMaybe ] = useState([]);
    const [ wont, setWont ] = useState([]);
    const { id } = useParams();

    var willList = []
    var maybeList = []
    var wontList = []

    const willListRender = will.map(function (item, index) {
        return (
            <div className="canStrike" key={index}>{item}</div>
        );
    });

    const maybeListRender = maybe.map(function (item, index) {
        return (
            <div key={index}>{item}</div>
        );
    });

    const wontListRender = wont.map(function (item, index) {
        return (
            <div key={index}>{item}</div>
        );
    });

    function getAttendeeList() {
        if (!hasLoaded) {
            willList = [];
            maybeList = [];
            wontList = [];
            getRSVP(id).then((snap) => {
                const value = snap.val();
                for (let user in value.users) {
                    let status = value.users[user].rsvpStatus
                    getUser(user).then((userDetails) => {
                        if (userDetails.exists()) {
                            const name = userDetails.val().name;
                            if (status === "Will Attend") {
                                willList.push(name);
                            } else if (status === "Maybe") {
                                maybeList.push(name);
                            } else {
                                wontList.push(name);
                            }
                            setWill(willList);
                            setMaybe(maybeList);
                            setWont(wontList);
                            setLoaded(true);
                        } 
                    });
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
                <h1> Attending </h1>
                {willListRender}
            </div>
            <div className = "column">
                <h1> Unsure </h1>
                {maybeListRender}
            </div>
            <div className = "column">
                <h1> Not Attending </h1>
                {wontListRender}
            </div> 
        </div>
    );
}