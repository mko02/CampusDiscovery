import React, { useEffect, useState } from "react";
import { getAnyEvent } from '../../firebase';
import { EventCard } from '../EventCard/EventCard';
import "./Dashboard.css";
import ReactPaginate from 'react-paginate';

export function Dashboard(){
    const [ events, setEvents ] = useState([]);
    const [ content, setContent ] = useState([]);
    const [ hasLoaded, setLoaded ] = useState(false);
    const [ pageNumber, setPageNumber ] = useState(0);
    
    const eventsPerPage = 10;
    const pagesVisited = pageNumber * eventsPerPage;
    const displayEvents = events
        .slice(pagesVisited, pagesVisited + eventsPerPage)
        .map(function(obj, i){
            return <div className="gridCard" key={obj.key}><EventCard event={obj.data} /></div>;
        })
        
        

    var eventList = [];

    function getEvents() {
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
    }

    useEffect(() => {
        getEvents()
    }, []);

    const pageCount = Math.ceil(events.length / eventsPerPage)

    function changePage({selected}) {
        setPageNumber(selected)
    }

    return (
        <div>
            <h1>Dashboard:</h1>
            <div className="gridContainer">
                {displayEvents}
            </div>
            <div className="paginationContainer">
                <ReactPaginate 
                    previousLabel = {"Previous"}
                    nextLabel = {"Next"}
                    pageCount = {pageCount}
                    onPageChange= {changePage}
                    containerClassName = {"pageButtons"}
                    activeClassName = {"paginationActive"}
                />
            </div>
        </div>
    )
}