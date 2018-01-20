import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = ({ loggedIn }) => {
  return (
    <nav className='level'>
      <div>
        <Link to='/'>
          <h3>MoodSurfer</h3>
        </Link>
        { 
          loggedIn ? 
            <Link style={ { alignSelf: 'right' } } to='/logout'>Logout</Link>
          : 
            <Link style={ { alignSelf: 'right' } } to='/register'>Sign Up</Link>
        }
      </div>
    </nav>
  )
}

export default Nav