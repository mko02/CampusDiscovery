import React, { useEffect, useState } from "react";
import { getAnyEvent } from '../../firebase';
import { EventCard } from '../EventCard/EventCard';
import "./Dashboard.css";

export function Dashboard(){
    const [ events, setEvents ] = useState([]);
    const [ content, setContent ] = useState([]);
    const [ hasLoaded, setLoaded ] = useState(false);

    var eventList = [];

    useEffect(() => {
        if(!hasLoaded) {
            getAnyEvent().then((snap) => {

                eventList = []
                const value = snap.val()
                for (let event in value) {
                    eventList.push({key: event, data: value[event]})
                }
                console.log(eventList);
                setEvents(eventList);
                setLoaded(true);
            })
        }
    }, []);

    return (
        <div>
            <h1>Dashboard:</h1>
            <div className="gridContainer">
                {events.map(function(obj, i){
                    return <a key={obj.key} className="gridCard" href={`/#/event/${obj.key}`}><div><EventCard event={obj.data} /></div></a>;
                })}
            </div>
        </div>
    )
}