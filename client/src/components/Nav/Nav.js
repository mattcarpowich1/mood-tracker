import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = ({ loggedIn, registerPage, triggerRegister }) => {
  return (
    <nav className='level'>
      <div>
        <Link className='logo' to='/'>
          <img 
            className='logo-icon'
            src='wave4.svg' 
            type="image/svg+xml"
            height='64px'
            style={ { 
              color: 'black',
              marginRight: '8px' } }/>
          {!loggedIn ?
            <h3 id='show-title'>MoodSurfer</h3> 
              : 
            <h3 id='hide-title'>MoodSurfer</h3>}
        </Link>
        { 
          loggedIn ? 
            <Link 
              style={ { 
                alignSelf: 'right', 
                fontFamily: 'Avenir, sans-serif' } } 
              to='/logout'>Logout</Link>
          : 
            null
        }
      </div>
    </nav>
  )
}

export default Nav