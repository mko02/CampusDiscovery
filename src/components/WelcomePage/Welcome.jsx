import React from 'react'
import './welcome.css'

export function Welcome() {
  return (
    <div className='welcome_container'> 

      <div>
        <h1 class='title_style'>
          Welcome to the Campus Discovery
        </h1>
        <div class='subtitle_style'>
          <p>
          Please login below!
          </p> 
        </div>
      </div>

      <div class='button_div'>
          <a href="/#/account" class='button_style'>
            Start App
          </a>
      </div>

    </div>
  )
}
