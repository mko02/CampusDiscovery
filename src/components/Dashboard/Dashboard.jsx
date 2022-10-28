import React, { useState, useEffect } from "react";
import { ref, get } from 'firebase/database';
import { db, getAnyEvent } from '../../firebase';
import { EventCard } from '../EventCard/EventCard';

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
                console.log(value)
                for (let event in value) {
                    eventList.push([value[event].title, value[event].timeStart])
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
            <div>
                {events.map(function(obj, i){
                    return <EventCard title={obj[0]} timeStart = {obj[1]} key={i} />;
                })}
            </div>
        </div>
    )
}