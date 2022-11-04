import { React, useState, useEffect, Button } from "react";
import { useParams} from "react-router-dom";
import { getRSVP, getUser } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
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
            <div key={index}>{item}</div>
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

    function loopDone(willl, maybel, wontl){
        setWill(willl);
        setMaybe(maybel);
        setWont(wontl)
        
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
                                if (!willList.includes(name)) {
                                    willList.push(name);
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
                            loopDone(willList, maybeList, wontList);
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