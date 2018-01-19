import React from 'react'
import './Button.css'

export const Button = props => {
  <button type={ props.type } 
    onClick={ prop.onClick }
    className='button'>
     { props.children }
  </button>
}