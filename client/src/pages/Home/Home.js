import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import Moods from '../../utils/Moods.js'
import MoodPrompt from '../../components/MoodPrompt'
import Button from '../../components/Button'
import {
  XYPlot, 
  XAxis, 
  YAxis, 
  HorizontalGridLines, 
  LineSeries,
  MarkSeries
} from 'react-vis'
import 'react-input-range/lib/css/index.css'
import './Home.css'

class Home extends Component {

  state = {
    show: false,
    userData: {},
    userId: this.props.user,
    hover: false,
    submitted: false,
    moodValues: [],
    timeValues: [],
    width: document.body.clientWidth * .9 - 72
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

  componentWillMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  componentDidMount() {
    Moods.fetchMoodsLastDay(this.props.user, this)
  }

  updateDimensions() {
    this.setState({width: window.innerWidth * .9 - 72})
  }

  submitMood = val => {
    this.setState({
      show: false
    })
    Moods.addMood(this.props.user, val, this)
  }

  render() {

    const { user } = this.props

    const { 
      FirstName,
      userData, 
      show,
      value,
      moodValues,
      timeValues,
      submitted,
      hover,
      width
     } = this.state

     const {
      hoverIn,
      hoverOut,
      submitMood
     } = this


    const buttonStyle = {
      width: '160px'
    }

    let dayAgo = moment(Date.now()).subtract(1, 'day')


    const myData = moodValues
      .map((item, index) => { 
        return { x: timeValues[index], y: item, color: item }
      })

    return (
      <div id='home_container' className={`main-screen${ show ? ' show' : ' hide' }`}>
        <div ref={ node => this.main = node } >

          {
            !submitted ? (
              <MoodPrompt 
                handler={ val => {
                  submitMood(val) 
                } }
                firstName={ FirstName } />
            ) : (
              <div id='graph' style={ {margin: '0 auto'} }>
                <XYPlot
                  width={ width }
                  height={ 300 }
                  xDomain={[
                    0,
                    60 * 60 * 24
                  ]} 
                  yDomain={ [0,10] }
                  colorDomain={ [0, 5, 10] }
                  colorRange={ ['red', '#bbb', 'blue'] }>
                  <HorizontalGridLines />
                  <LineSeries
                    data={ myData }
                    curve={ 'curveMonotoneX' }/>
                  <MarkSeries data={ myData }
                    colorType="linear"
                    colorDomain={ [0, 10] }
                    colorRange={ ['#f51e57', '#3b38df'] } />
                  <XAxis 
                    tickValues={[
                      0, 
                      (60 * 60 * 8), 
                      (60 * 60 * 16), 
                      (60 * 60 * 24)
                    ]}
                    tickFormat={ v => {
                      let dayAgo = moment(Date.now()).subtract(1, 'day')
                      let tMoment = dayAgo.add(v, 'second')
                      let val = tMoment.format('h:mm a')
                      return val
                    } }
                    tickLabelAngle={ -30 } />
                  <YAxis tickValues={ [0, 2, 4, 6, 8, 10] }/>
                </XYPlot>
                <h2 style={ {
                  textAlign: 'center',
                  fontFamily: '"Avenir"',
                  alignSelf: 'center'} }>
                  Displaying past 24 hours</h2>

                <Button hover={ this.state.hover } 
                  hoverIn={ this.hoverIn }
                  hoverOut={ this.hoverOut }
                  styling={ buttonStyle }
                  type={ 'button' }
                  clickHandler={ () => {
                    setTimeout(() => {
                      this.setState({
                        submitted: false,
                        show: true
                      })
                    }, 320)
                    this.setState({
                      show: false
                    })
                  } }>Add Mood Entry</Button>

              </div>
            )
          }
        </div>
      </div>
    )

  }
}

export default Home