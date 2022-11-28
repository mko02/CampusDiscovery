import React, { useEffect, useState } from "react";
import { BsFilterLeft, BsSortDownAlt } from 'react-icons/bs';
import ReactPaginate from "react-paginate";
import { Link, useSearchParams } from "react-router-dom";
import { checkLoggedIn, getAnyEvent, getUser } from "../../firebase";
import { EventCard } from "../EventCard/EventCard";
import "./Dashboard.css";

export function Dashboard() {
  const [events, setEvents] = useState([]);
  const [hasLoaded, setLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  
  const handleSort = (sortBy) => {
    localStorage.setItem('sort', sortBy);
    window.location.reload();
  }

  let sortBy = localStorage.getItem('sort');

  const eventsPerPage = 10;
  const pagesVisited = pageNumber * eventsPerPage;
  const displayEvents = events
    .slice(pagesVisited, pagesVisited + eventsPerPage)
    .map(function (obj, i) {
      return (
        <a className="gridCard" key={obj.key} href={`/#/event/${obj.key}`}>
          <EventCard event={obj.data}/>
        </a>
      );
    });

  var eventList = [];

  useEffect(() => {
    checkLoggedIn();
  }, []);

  function getEvents() {
    if (!hasLoaded) {
      getAnyEvent().then((snap) => {
        eventList = [];
        const value = snap.val();
        for (let event in value) {
          eventList.push({ key: event, data: value[event] });
        }

        if (sortBy === "date") {
          eventList.sort((a,b) => 
            b.data.timeStart - a.data.timeStart)
        } else if (sortBy === "eventName") {
          eventList.sort((a,b) => 
            a.data.title.localeCompare(b.data.title))
        } else if (sortBy === "host") {
          eventList.sort((a,b) => 
            a.data.host.localeCompare(b.data.host))
        } else {
          eventList.sort((a,b) => 
            b.data.timeStart - a.data.timeStart)
        }

        //console.log(eventList);
        setEvents(eventList);
        setLoaded(true);
      });
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  const pageCount = Math.ceil(events.length / eventsPerPage);

  function changePage({ selected }) {
    setPageNumber(selected);
  }

  
  return (
    <div style={{paddingTop: "30px", position: "relative"}}>
      <h1 style={{userSelect: "none"}}>Dashboard:</h1>
      <div style={{marginBottom: "10px"}}>
        <a href="/#/createEvent" className='button_style'>
          Create Event
        </a>
      </div>
      <div className="gridContainer">{displayEvents}</div>
      <div className="paginationContainer">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pageButtons"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
}
