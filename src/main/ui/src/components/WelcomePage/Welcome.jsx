import React from 'react'
import { Home } from "../exportPages";
import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import './welcome.css'

export function Welcome() {
  return (
    <div> 
        <p className='title_style'>Welcome Page</p>
        <a href="/#/account">
            <div className='button_style'>
                <button>Start App</button>
            </div>
        </a>
    </div>
  )
}
