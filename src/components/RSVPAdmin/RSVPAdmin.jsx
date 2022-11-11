import { onAuthStateChanged } from "firebase/auth";
import { Button, React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRSVP, getUser } from "../../firebase";
import "./RSVPAdmin.css";

export function RSVPAdmin(props) {
    const [inviteStatus, setInviteStatus] = useState(""); //0 is not invite-only, 1 is invite-only
    const [hasLoaded, setLoaded] = useState(false);
    const [ will, setWill ] = useState([]);
    const [ maybe, setMaybe ] = useState([]);
    const [ wont, setWont ] = useState([]);
    const id = props.eventID;

    var willList = [];
    var maybeList = [];
    var wontList = [];


    const willListRender = will.map(function (item, index) {
        return (
            <div className="canStrike rsvpNameList" key={index} onClick={() => {
                console.log(item.uid)
            }}>{item.name}</div>
        );
    });

    const maybeListRender = maybe.map(function (item, index) {
        return (
            <div className="rsvpNameList" key={index}>{item}</div>
        );
    });

    const wontListRender = wont.map(function (item, index) {
        return (
            <div className="rsvpNameList" key={index}>{item}</div>
        );
    });

    function loopDone(willl, maybel, wontl){
        if(will != null) {
            setWill(willl);
            setMaybe(maybel);
            setWont(wontl)
            setLoaded(true);
        }
    }

    function getAttendeeList() {
        if (!hasLoaded) {
            setLoaded(true);
            getRSVP(id).then((snap) => {
                willList = [];
                maybeList = [];
                wontList = [];
                const value = snap.val();
                let counter = 0;
                for (let user in value.users) {
                    let status = value.users[user].rsvpStatus
                    getUser(user).then((userDetails) => {
                        if (userDetails.exists()) {
                            const name = userDetails.val().name;
                            if (status === "Will Attend") {
                                if (!willList.some(e => e.uid === user)) {
                                    willList.push({uid: user,
                                        name: name});
                                }
                            } else if (status === "Maybe") {
                                if (!maybeList.includes(name)) {
                                    maybeList.push(name);
                                }
                            } else {
                                if (!wontList.includes(name)) {
                                    wontList.push(name);
                                }
                            }
                        }
                        if (counter == Object.keys(value.users).length  - 1) {
                            return loopDone(willList, maybeList, wontList);
                        }
                        counter++;
                    });
                }
            });
        }
    }

    useEffect(() => {
        getAttendeeList();
    }, []);

    return (
        <div className = "attendanceGrid rsvp-container">
            <div className = "column">
                <h1> Attending </h1>
                <hr></hr>
                {willListRender}
            </div>
            <div className = "column">
                <h1> Unsure </h1>
                <hr></hr>
                {maybeListRender}
            </div>
            <div className = "column">
                <h1> Not Attending </h1>
                <hr></hr>
                {wontListRender}
            </div> 
        </div>
    );
}