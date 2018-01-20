import React, { Component } from 'react'
import { 
  BrowserRouter as Router,
  Route, 
  Redirect } from 'react-router-dom'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import Nav from '../Nav'
import Register from '../../pages/Register'
import Login from '../../pages/Login'
import Home from '../../pages/Home'

class Main extends Component {

  state = {
    loggedIn: false,
    userId: null,
    error: null
  }

  componentWillMount() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      this.setState({
        loggedIn: true,
        userId: token.aud
      })
    }
  }

  handleError = err => {
    switch (typeof(err)) {
      case "string":
        this.setState({
          error: err
        })
        break;

      case "object":
        if (err.response) {
          this.setState({
            error: err.response.data
          })
        }
        break;

      default:
        this.setState({
          error: defaultErrorMessage
        })
    }
  }

  handleRegister = (username, email, passwordHash) => {
    const userData = {
      username,
      email,
      passwordHash,
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
      let token = jwt.verify(res.data, 'this-is-a-secret');
      if (token) { 
        localStorage.setItem('token', JSON.stringify(token))
        this.setState({
          loggedIn: true,
          userId: token.aud
        })
      } else {
        this.handleError('Could not verify user')
      } 
    })
    .catch(err => {
      this.handleError(err)
    })
  }

  handleLogout = () => {
    localStorage.setItem("token", null)
    this.setState({
      loggedIn: false,
      userId: null
    })
  }

  render() {  

    const { 
     loggedIn,
     error, 
     userId } = this.state

    const {
      handleRegister,
      handleLogin,
      handleLogout
    } = this

    return (
      <Router>
        <div className='main'>

          <Nav loggedIn= { loggedIn }/>

          <Route exact path='/' 
            component={() =>
              loggedIn ? 
              <Home user={ userId } /> 
                : 
              <Login 
                handler={( u, pH ) =>
                  handleLogin(u, pH)
                }
                error={ error } 
              />
          }/>

          <Route path='/register' 
            component={() => 
              loggedIn ? 
              <Redirect to='/' /> 
                : 
              <Register 
                handler={( u, e, pH ) => 
                  handleRegister(u, e, pH)
                }
              />
          }/>

          <Route path='/logout'
            component={() => {
              handleLogout()
              return <Redirect to='/' /> 
            }} 
          />

        </div>
      </Router>
    ) 

  }

}

const defaultErrorMessage = 'Oops! Looks like there was an error.'

export default Main