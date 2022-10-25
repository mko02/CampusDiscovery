import React, { useState, useEffect } from "react";
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import { EventCard } from '../EventCard/EventCard';

export function Dashboard(){
    const [ events, setEvents ] = useState([]);

    var eventList = [];

    useEffect(() => {
        eventList = [];
        const eventItem = ref(db, "events/");
        onValue(eventItem, (snapshot) => {
            snapshot.forEach(c => {
                const eventObject = c.val();
                eventList.push(eventObject.title);
            })
        })
        setEvents(eventList);
        console.log("EVENTLIST");
        console.log(events);
    }, []);

    return (
        <div>
            <h1>Dashboard:</h1>
            <div>
                    {events.map((data) => {
                        return (<EventCard title = { data } />);
                    })}
            </div>
        </div>
    )
}