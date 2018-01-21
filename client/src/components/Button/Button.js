import React from 'react'
import './Button.css'

const Button = props => 
  <button onMouseEnter={ e => props.hoverIn() } 
    onMouseLeave={ e => props.hoverOut() }
    style={ props.styling }
    className={ props.hover ? 'hover' : '' }
    type={ props.buttonType }
  >
    { props.children }
  </button>

export default Button