import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CreateEvent.css";


export function CreateEvent(){
        return (
            <div>
                <h1>Create Event:</h1>
                <p>Input boxes</p>
        <div className="container">
            <form action="/action_page.php"/>
            <div className="form-group"/>
            <label htmlFor="eventTitle">Title</label>
            <input type="eventTitle" className="form-control" id="eventTitle" placeholder="Enter Title" name="eventTitle"/>
        </div>
        <div className="form-group">
            <label htmlFor="organizerFullName"> Full Name :</label>
            <input type="organizerFullName" className="form-control" id="organizerFullName" placeholder="Enter Your Full Name" name="organizerFullName"/>
            </div>
            <div className="form-group">
                <label htmlFor="eventLocation">Location:</label>
                <input type="eventLocation" className="form-control" id="eventLocation" placeholder="Enter Event Location" name="eventLocation"/>

                </div>
                <div className="form-group">
                <label htmlFor="eventStartTime"> Event Start Time:</label>
                <input type="eventstartTime" className="form-control" id="eventstartTime" placeholder="Enter Event Start Time" name="eventStartTime"/>

                </div>
               
                <div className="form-group">
                <label htmlFor="eventEndTime"> Event End Time:</label>
                <input type="eventEndTime" className="form-control" id="eventEndTime" placeholder="Enter Event End Time" name="eventEndTime"/>

                </div>




                <label htmlFor="eventDescription">Event Description: </label>
                <textarea id="eventDescription" name="evetDescription" rows="5" cols="33"></textarea>
                <br></br>

                <button type="submit" className="button">Submit</button>
                <form/>
                <div/>
                
                




            </div>
               
                



                
        )
}