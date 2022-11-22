import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { checkLoggedIn, getAnyEvent, getUser } from "../../firebase";
import { EventCard } from "../EventCard/EventCard";
import { FiFilter } from 'react-icons/fi';
import "./Dashboard.css";

export function Dashboard() {
  const [events, setEvents] = useState([]);
  const [hasLoaded, setLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  
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
    getEvents();
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

  const pageCount = Math.ceil(events.length / eventsPerPage);

  function changePage({ selected }) {
    setPageNumber(selected);
  }

  
  return (
    <div style={{paddingTop: "30px", position: "relative"}}>
      <div className="profileIcon">
        <Link to="/account">
          <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" version="1.1" viewBox="0 0 752 752">
            <path 
              fill="#FFFFFF"
              d="m565.91 287.44c-6.1562-18.469-16.102-33.625-33.625-43.57-39.781-23.207-79.562-45.938-119.34-69.145-10.891-6.1562-22.258-9.4727-34.57-9.9453-13.734-0.47266-26.52 1.8945-38.359 8.9961-40.254 23.207-80.508 45.938-120.29 69.617-23.68 14.207-36.465 35.52-36.465 63.461-0.47266 45.938 0 92.348 0 138.29 0 7.1055 0.94531 14.207 3.3164 20.836 6.1562 17.996 16.574 32.676 33.152 42.148 39.309 22.73 79.09 45.465 118.39 68.195 10.418 6.1562 21.312 9.4727 33.152 10.418 14.68 0.94531 28.414-1.4219 41.203-8.9961 39.781-23.207 79.562-46.41 119.34-69.145 11.367-6.1562 19.891-15.156 26.047-26.047 6.1562-10.418 10.891-21.785 10.891-34.098v-141.6c-0.003906-6.625-0.95312-13.254-2.8477-19.41zm-189.91 211.69c-67.723 0-123.13-54.934-123.13-123.13 0-68.195 54.934-123.13 123.13-123.13 67.723 0 123.13 54.934 123.13 123.13 0 68.195-55.41 123.13-123.13 123.13zm3.7891-135.45h-7.5781c-45.465 0-74.824 24.625-74.824 62.984v11.84c0 3.7891 3.3164 7.1055 7.1055 7.1055h142.55c3.7891 0 7.1055-3.3164 7.1055-7.1055v-11.84c0.47266-38.355-28.891-62.984-74.355-62.984zm60.621 67.723h-128.34v-4.7344c0-35.992 31.258-48.777 60.617-48.777h7.5781c29.363 0 60.617 12.785 60.617 48.777v4.7344zm-64.41-69.617c20.836 0 37.414-16.574 37.414-37.414v-8.9961c0-20.836-16.574-37.414-37.414-37.414-20.836 0-37.414 16.574-37.414 37.414v8.9961c0.003906 20.84 16.578 37.414 37.414 37.414zm-23.203-46.41c0-12.785 10.418-23.207 23.207-23.207 12.785 0 23.207 10.418 23.207 23.207v8.9961c0 12.785-10.418 23.207-23.207 23.207-12.785 0-23.207-10.418-23.207-23.207z"/>
          </svg>
        </Link>
      </div>
      <div className="DashBoard_filterIcon_container">
        <FiFilter 
            className="DashBoard_filterIcon"
            onClick={handleOpen}/>
      </div>
      <div className="dashboard_dropdown">
        { open &&
          <div>
            <button className="dashboard_dropdown_button" onClick={() => handleSort("date")}>Date</button>
            <button className="dashboard_dropdown_button" onClick={() => handleSort("eventName")}>Event Name</button>
            <button className="dashboard_dropdown_button" onClick={() => handleSort({ sort: "host"})}>Host</button>
          </div>
        }
      </div>
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
