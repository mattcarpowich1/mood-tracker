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
    week: false,
    width: document.body.clientWidth * .81 - 72
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
    this.setState({width: window.innerWidth * .81 - 72})
  }

  weekSelect = () => {
    Moods.fetchMoodsLastWeek(this.props.user, this)
  }

  daySelect = () => {
    Moods.fetchMoodsLastDay(this.props.user, this)
  }

  submitMood = val => {
    this.setState({
      show: false
    })
    Moods.addMood(this.props.user, val, this, this.state.week)
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
      width,
      week
     } = this.state

     const {
      hoverIn,
      hoverOut,
      submitMood,
      weekSelect,
      daySelect
     } = this


    const buttonStyle = {
      width: '160px'
    }

    let dayAgo = moment(Date.now()).subtract(1, 'day')


    const myData = moodValues
      .map((item, index) => { 
        return { x: timeValues[index], y: item, color: item }
      })

    const dayDomain = [0, 3600 * 24]
    const dayTicks= [0, (60 * 60 * 8), (60 * 60 * 16), (60 * 60 * 24)]

    const dayFormat = v => {
      let dayAgo = moment(Date.now()).subtract(1, 'day')
      let tMoment = dayAgo.add(v, 'second')
      let val = tMoment.format('h:mm a')
      return val
    }

    const nowSeconds = parseInt(moment(Date.now()).format('s')) +
                      (parseInt(moment(Date.now()).format('m')) * 60) + 
                      (parseInt(moment(Date.now()).format('H')) * 3600)

    const weekTicks = [ 
      0 + nowSeconds,
      (3600 * 24) + nowSeconds,
      (3600 * 48) + nowSeconds,
      (3600 * 72) + nowSeconds,
      (3600 * 96) + nowSeconds,
      (3600 * 120) + nowSeconds, 
      (3600 * 144) + nowSeconds,
      (3600 * 168) + nowSeconds]
    const weekDomain = [0, 3600 * 168]

    const weekFormat = v => {
      let weekAgo = moment(Date.now()).subtract(1, 'week')
      let tMoment = weekAgo.add(v, 'second')
      let val = tMoment.format('dddd')
      return val
    }

    let ticks, format, domain

    if (week) {
      domain = weekDomain
      ticks = weekTicks
      format = weekFormat
    } else {
      domain = dayDomain
      ticks = dayTicks
      format = dayFormat
    }

    return (
      <div id='home_container' className={`main-screen${ show ? ' show' : ' hide' }`}>
        <div style={{ width: '66.6%' }} ref={ node => this.main = node } >

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
                  xDomain={ domain } 
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
                    hideLine
                    tickValues={ ticks }
                    tickFormat={ format }
                    tickLabelAngle={ -35 } />
                  <YAxis 
                    tickValues={ [0, 2, 4, 6, 8, 10] }/>
                </XYPlot>

                <div id='time_toggle'>
                  <a
                    className='toggler'
                    style={ week ? null : { 'color': '#222', 'fontWeight': '500'} }
                    onClick={ daySelect }>DAY</a>
                  <a
                    className='toggler'
                    style={ week ? { color: '#222', 'fontWeight': '500'} : null }
                    onClick={ weekSelect }>WEEK</a>
                 </div>

                <h2 style={ {
                  textAlign: 'center',
                  fontFamily: 'Avenir',
                  fontWeight: '300',
                  color: '#222',
                  alignSelf: 'center'} }>
                  {`Displaying past ${ week ? 'week' : '24 hours'}.`}</h2>

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