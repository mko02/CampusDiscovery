import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { coordinates } from "../../constants";
import { checkLoggedIn, getAnyEvent, getUser } from "../../firebase";
import "./map.css";

export function EventMap() {
  const [hasLoaded, setLoaded] = useState(false);
  const [events, setEvents] = useState([]);

  const center = [33.77631, -84.39788];

  var eventList = [];

  function getEvents() {
    if (!hasLoaded) {
      getAnyEvent().then((snap) => {
        eventList = [];
        const value = snap.val();
        for (let event in value) {
          eventList.push({ key: event, data: value[event] });
        }
        console.log(eventList);

        let filteredList = [];
        let filterBy = JSON.parse(localStorage.getItem("filter"));
        let sortBy = localStorage.getItem("sort");

        if (filterBy[1] !== "") {
          for (let event in eventList) {
            if (
              eventList[event].data.location.toLowerCase().includes(filterBy[1])
            ) {
              filteredList.push(eventList[event]);
            }
          }
          eventList = filteredList;
          filteredList = [];
        }

        if (filterBy[2] !== null) {
          for (let event in eventList) {
            if (eventList[event].data.timeStart >= filterBy[2]) {
              filteredList.push(eventList[event]);
            }
          }
          eventList = filteredList;
          filteredList = [];
        }

        if (filterBy[3] != null) {
          for (let event in eventList) {
            if (eventList[event].data.timeStart <= filterBy[3]) {
              filteredList.push(eventList[event]);
            }
          }
          eventList = filteredList;
          filteredList = [];
        }

        if (filterBy[0] !== "") {
          let counter = eventList.length;
          for (let event in eventList) {
            getUser(eventList[event].data.host).then((snap) => {
              if (snap.val().name.toLowerCase().includes(filterBy[0])) {
                filteredList.push(eventList[event]);
              }
              counter--;
              if (counter == 0) {
                eventList = filteredList;

                if (sortBy === "date") {
                  eventList.sort((a, b) => b.data.timeStart - a.data.timeStart);
                } else if (sortBy === "eventName") {
                  eventList.sort((a, b) => a.data.title.localeCompare(b.data.title));
                } else if (sortBy === "host") {
                  eventList.sort((a, b) => a.data.host.localeCompare(b.data.host));
                } else {
                  eventList.sort((a, b) => b.data.timeStart - a.data.timeStart);
                }
                if (localStorage.getItem("reverse") == "1") {
                  eventList.reverse();
                }
      
      
                let locationList = {};
                for (let event in eventList) {
                  if (locationList[eventList[event].data.location] != undefined) {
                    locationList[eventList[event].data.location].push(
                      eventList[event]
                    );
                  } else {
                    locationList[eventList[event].data.location] = [eventList[event]];
                  }
                }
                console.log(locationList);
      
                let locationListFix = [];
                for (const [key, value] of Object.entries(locationList)) {
                  locationListFix.push(value);
                }
              }
            });
          }
        } else {
          if (sortBy === "date") {
            eventList.sort((a, b) => b.data.timeStart - a.data.timeStart);
          } else if (sortBy === "eventName") {
            eventList.sort((a, b) => a.data.title.localeCompare(b.data.title));
          } else if (sortBy === "host") {
            eventList.sort((a, b) => a.data.host.localeCompare(b.data.host));
          } else {
            eventList.sort((a, b) => b.data.timeStart - a.data.timeStart);
          }
          if (localStorage.getItem("reverse") == "1") {
            eventList.reverse();
          }


          let locationList = {};
          for (let event in eventList) {
            if (locationList[eventList[event].data.location] != undefined) {
              locationList[eventList[event].data.location].push(
                eventList[event]
              );
            } else {
              locationList[eventList[event].data.location] = [eventList[event]];
            }
          }
          console.log(locationList);

          let locationListFix = [];
          for (const [key, value] of Object.entries(locationList)) {
            locationListFix.push(value);
          }
          setEvents(locationListFix);
          setLoaded(true);
        }
      });
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  const getAllMarkers = events.map(function (location, i) {
    console.log(location);
    return (
      <Marker
        key={location[0].key}
        position={
          coordinates.find((obj) => obj.name == location[0].data.location)
            .location
        }
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>
          {location.map(function (event, i) {
            return (
              <div key={i}>
                <a href={`/#/event/${event.key}?from=map`}>{event.data.title}</a>
              </div>
            );
          })}
        </Popup>
      </Marker>
    );
  });

  function renderMap() {
    return (
      <MapContainer
        center={center}
        style={{ width: "700px", height: "500px", display: "inline-block" }}
        zoom={15.4}
        scrollWheelZoom={false}
        maxZoom={18}
        minZoom={15}
        maxBounds={[
          [33.787049, -84.413947],
          [33.763686, -84.381709],
        ]}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {getAllMarkers}
      </MapContainer>
    );
  }

  return (
    <>
      <h1 style={{ paddingTop: "30px" }}>Map</h1>
      <div id="map-containter" style={{ marginTop: "40px" }}>
        {hasLoaded && renderMap()}
      </div>
    </>
  );
}
