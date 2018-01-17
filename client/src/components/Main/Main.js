import React, { Component } from 'react'
import axios from 'axios'

import Signup from '../../pages/Signup'
// import Login from '../../pages/Login'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Home from '../../pages/Home'

class Main extends Component {

  state = {
    loggedIn: false,
    userId: null
  }

  handleRegister = (
    username,
    email,
    password
  ) => {
    const userData = {
      username: username,
      email: email,
      password: password,
      passwordSalt: 'testSalt'
    }
    axios.post('/user/add', userData)
    .then(res => {
      // console.log(res)
      this.setState({
        loggedIn: true,
        userId: res.data.ID
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  // handleLogin = ({
  //   username,
  //   password,
  // }) => {
  //   event.preventDefault()
  //   axios.post('', {
  //     username,
  //     password
  //   })
  //   .then(res => {
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  render() {

    return !this.state.loggedIn ?  
      <Signup 
        handler={ ( u, e, pH ) => 
          this.handleRegister(u, e, pH) }
      /> 
    : <h1 style={{ textAlign: 'center' }}>{ `Logged in as ID: ${ this.state.userId }` }</h1> 

  }

}

export default Main