import React, { Component } from 'react'
import Button from '../Button'
import InputRange from 'react-input-range'
import './MoodPrompt.css'

class MoodPrompt extends Component {

  state = {
    hover: false,
    value: 5
  }

  hoverIn = () => {
    this.setState({
      hover: true
    })
  }

  hoverOut = () => {
    this.setState({
      hover: false
    })
  }

  render() {

    const { firstName, handler } = this.props
    const { value, hover } = this.state
    const { hoverIn, hoverOut } = this

    const buttonStyle = {
      width: '160px',
      marginBottom: '16px'
    }

    return (
      <div style={ { width: '100%' } }>

        <h2 className='greeting'>
          { `Hi ${ firstName }, how are you feeling?` }
        </h2>

        <InputRange
          maxValue={10}
          minValue={0}
          value={ value }
          onChange={value => this.setState({ value })} />

        <Button hover={ hover } 
          hoverIn={ hoverIn }
          hoverOut={ hoverOut }
          styling={ buttonStyle }
          type={ 'button' }
          clickHandler={ e => handler(value) }>SUBMIT</Button>

      </div> 
    )
  }


}

export default MoodPrompt