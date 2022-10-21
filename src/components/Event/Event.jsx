import React, { Component } from "react";
import {
    getEvent
  } from "../../firebase";
import { useParams } from 'react-router-dom';

export async function Event(){
    const { id } = useParams()
    console.log(id);

    let response = await getEvent(id);
    console.log(response);

    if(response === null) {
        console.log("doesn't exist");
    } else {
        console.log("exist");
    }


    return (
        <div>
            <h1>Event:</h1>
            <p>Future events will be displayed below.</p>
        </div>
    )

}