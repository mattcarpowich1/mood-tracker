import React, { Component } from 'react'
import { 
  BrowserRouter as Router,
  Route, 
  Redirect } from 'react-router-dom'
import axios from 'axios'
import Register from '../../pages/Register'
import Login from '../../pages/Login'
import Home from '../../pages/Home'

class Main extends Component {

  state = {
    loggedIn: false,
    userId: null,
    error: null
  }

  handleError = message => {
    this.setState({
      error: message
    })
  }

  handleRegister = (username, email, password) => {
    const userData = {
      username: username,
      email: email,
      passwordHash: password,
      passwordSalt: 'testSalt'
    }
    axios.post('/user/add', userData)
    .then(res => {
      this.setState({
        loggedIn: true,
        userId: res.data.ID
      })
    })
    .catch(err => {
      const { data } = err.response
      this.handleError(data)
    })
  }

  handleLogin = (username, password) => {
    const userData = {
      Username: username,
      PasswordHash: password
    }
    axios.post('/user/login', userData)
    .then(res => {
      this.setState({
        loggedIn: true,
        userId: res.data
      })
    })
    .catch(err => {
      const { data } = err.response
      this.handleError(data)
    })
  }

  render() {

    const { loggedIn, error } = this.state

    return (
      <Router>
        <div>

          <Route exact path='/' 
            component={() => (
              loggedIn ? 
              <Home user={ this.state.userId } /> 
                : 
              <Login 
                handler={( u, pH ) =>
                  this.handleLogin(u, pH)
                }
                error={ error } 
              />
            )
          }/>

          <Route path='/register' 
            component={() => (
              loggedIn ? 
              <Redirect to='/' /> 
                : 
              <Register 
                handler={( u, e, pH ) => 
                  this.handleRegister(u, e, pH)
                } 
              />
            )
          }/>

        </div>
      </Router>
    ) 

  }

}

export default Main