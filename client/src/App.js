import React, { Component } from 'react'
import { tween, styler, easing, keyframes } from 'popmotion'
import './App.css'
import Main from './components/Main'
import Nav from './components/Nav'

class App extends Component {

  render() {

    return (
      <div className='App'>
        <Main />
      </div>
    )
    
  }
}

export default App
