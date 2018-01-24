import React from 'react'
import './Button.css'

const Button = props => 
  <button onMouseEnter={ e => props.hoverIn() } 
    onMouseLeave={ e => props.hoverOut() }
    style={ props.styling }
    className={ props.hover ? 'hover' : '' }
    type={ props.buttonType }
    onClick={ props.clickHandler ? props.clickHandler : null}
  >
    { props.children }
  </button>

export default Button