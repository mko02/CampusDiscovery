import React, { Component } from "react";
import {Link } from "react-router-dom";
import "./CreateEvent.css";


export function CreateEvent(){
        return (
            <div>
                <h1>Create Event:</h1>
                <p>Input boxes</p>
        <div class="container">
            <form action="/action_page.php"/>
            <div class="form-group"/>
            <label for="eventTitle">Title</label>
            <input type="eventTitle" class="form-control" id="eventTitle" placeholder="Enter Title" name="eventTitle"/>
        </div>
        <div class="form-group">
            <label for="organizerFullName"> Full Name :</label>
            <input type="organizerFullName" class="form-control" id="organizerFullName" placeholder="Enter Your Full Name" name="organizerFullName"/>
            </div>
            <div class="form-group">
                <label for="eventLocation">Location:</label>
                <input type="eventLocation" class="form-control" id="eventLocation" placeholder="Enter Event Location" name="eventLocation"/>

                </div>
                <div class="form-group">
                <label for="eventStartTime"> Event Start Time:</label>
                <input type="eventstartTime" class="form-control" id="eventstartTime" placeholder="Enter Event Start Time" name="eventStartTime"/>

                </div>
               
                <div class="form-group">
                <label for="eventEndTime"> Event End Time:</label>
                <input type="eventEndTime" class="form-control" id="eventEndTime" placeholder="Enter Event End Time" name="eventEndTime"/>

                </div>




                <label for="eventDescription">Event Description: </label>
                <textarea id="eventDescription" name="evetDescription" rows="5" cols="33"></textarea>
                <br></br>

                <button type="submit" class="button">Submit</button>
                <form/>
                <div/>
                
                




            </div>
               
                



                
        )
}