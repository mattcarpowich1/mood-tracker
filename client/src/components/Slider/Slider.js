import React, { Component } from 'react'
import './Slider.css'

class Slider extends Component {

  state = {
    value: 0,
    on: false
  }

  triggerOn = e => {
    this.setState({
      on: true
    })
    document.body.addEventListener('mouseup', () => {
      this.setState({
        on: false
      })
    })
  }

  triggerOff = e => {
    this.setState({
      on: false
    })
  }

  handleChange = e => {
    this.setState({
      value: e.clientX
    })
  }

  render() {

    return (
      <div id='slider_container'>
        <div id='slider_thumb'
          style={ { left: `${ 276 - this.state.value }px`} }
          data-val={this.state.value}
          onMouseDown={this.triggerOn}
          onMouseMove={e => {
            if (this.state.on) {
              this.props.handleChange(e)
            }
          }}
          onMouseUp={this.triggerOFf}
          ref={ node => {
            this.sliderThumb = node
          } }>
        </div>
      </div>
    )

  }

}

export default Slider
