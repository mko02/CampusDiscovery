import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { coordinates } from "../../constants";
import { checkLoggedIn, getAnyEvent } from "../../firebase";
import "./map.css";

export function EventMap() {
  const [hasLoaded, setLoaded] = useState(false);
  const [events, setEvents] = useState([]);

  const center = [33.77631, -84.39788];

  useEffect(() => {
    if (!hasLoaded) {
      getAnyEvent().then((snap) => {
        let eventList = [];
        const value = snap.val();
        for (let event in value) {
          eventList.push({ key: event, data: value[event] });
        }
        eventList.sort((a, b) => b.data.timeStart - a.data.timeStart);
        setEvents(eventList);
        setLoaded(true);
      });
    }
  }, []);
  
  const getAllMarkers = events.map(function (eventDetails, i) {
    return (
      <Marker
        key={eventDetails.key}
        position={coordinates.find(obj => obj.name == eventDetails.data.location).location}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>
          <a href={`/#/event/${eventDetails.key}`}>{eventDetails.data.title}</a>
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
      <div id="map-containter">{hasLoaded && renderMap()}</div>
    </>
  );
}
