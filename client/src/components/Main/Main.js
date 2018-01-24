import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { handleError } from '../../utils/ErrorHandlers.js'
import Auth from '../../utils/Auth.js'
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
    Auth.findToken(this)
  }

  handleRegister = (username, firstName, email, passwordHash) => {
    Auth.registerUser(username, firstName, email, passwordHash)
    .then(id => {
      this.setState({
        loggedIn: true,
        userId: id
      })
    })
    .catch(err => handleError(err, this))
  }

  handleLogin = (username, password) => {
    Auth.loginUser(username, password) 
    .then(id => {
      this.setState({
        loggedIn: true,
        userId: id
      })
    })
    .catch(err => handleError(err, this))
  }

  handleLogout = () => {
    Auth.logoutUser(this)
  }

  render() {  

    const { 
      loggedIn, 
      error, 
      userId 
    } = this.state

    const { 
      handleRegister, 
      handleLogin, 
      handleLogout 
    } = this

    return (
      <Router>
        <div className='main'>
          <Nav loggedIn= { loggedIn }
            triggerFade={ this.triggerFadeOut } />

          <Route exact path='/' 
            component={() => 
              loggedIn ? <Home user={ userId } /> 
                : 
              <Register 
                handler={( u, fN, e, pH ) => 
                  handleRegister(u, fN, e, pH)
                }
              />
            }
          />

          <Route path='/login' 
            component={() => 
              loggedIn ? <Redirect to='/' /> 
                : 
              <Login 
                handler={( u, pH ) =>
                  handleLogin(u, pH)
                }
                error={ error } 
              />
            }
          />

          <Route path='/logout'
            component={() => {
              handleLogout()
              return <Redirect to='/' /> 
            }
          }/>

        </div>
      </Router>
    ) 
  }

}

export default Main