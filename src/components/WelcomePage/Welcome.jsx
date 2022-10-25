import React from 'react'
import './welcome.css'

export function Welcome() {
  return (
    <div className='welcome_container'> 

      <div>
        <h1 className='title_style'>
          Welcome to the Campus Discovery
        </h1>
        <div className='subtitle_style'>
          <p>
          Please login below!
          </p> 
        </div>
      </div>

      <div className='button_div'>
          <a href="/#/account" className='button_style'>
            Start App
          </a>
      </div>

    </div>
  )
}
