import React, { Component } from 'react'
import axios from 'axios'

import Register from '../../pages/Register'
import Login from '../../pages/Login'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from '../../pages/Home'

class Main extends Component {

  state = {
    loggedIn: false,
    userId: null
  }

  componentWillMount() {

  }

  handleRegister = (
    username,
    email,
    password
  ) => {
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
      console.log(err)
    })
  }

  handleLogin = ({
    username,
    password,
  }) => {

    // event.preventDefault()
    // axios.post('', {
    //   username,
    //   password
    // })
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }

  render() {

    const { loggedIn } = this.state

    return (
      <Router>
        <div>
          <Main>

            <Route exact path='/' 
              component{() => (
                loggedIn ? 
                  <Home 
                    user={this.state.userId}
                  /> : 
                  <Login 
                    handler={( u, pH ) =>
                      this.handleLogin(u, pH)
                    }
                  />
              )}/>

            <Route path='/register' 
              component={() => (
                loggedIn ? <Redirect to='/' /> : 
                <Register 
                  handler={( u, e, pH ) => 
                    this.handleRegister(u, e, pH) 
                  } />
              )} />

            {/*
                <h1 style={{ textAlign: 'center' }}>
            //     { `Logged in as ID: ${ this.state.userId }` }
            </h1> */}  
          </Main>
        </div>
      </Router>
    ) 

  }

}

export default Main