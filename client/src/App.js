import React, { Component } from 'react'
import './App.css'
import Main from './components/Main'
import Nav from './components/Nav'
// import Home from './pages/Home'
// import Footer from './components/Footer'

class App extends Component {

  render() {
    return (
      <div className='App'>
        <Nav />

        <Main />

      {/*<Footer />*/}
      </div>
    )
  }
}

export default App
