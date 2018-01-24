import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Welcome from '../../components/Welcome.js'
import './Register.css'

class Register extends Component {

  state = {
    hover: false,
    show: -1
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

  componentDidMount() {
    this.username.focus()
  }

  render() {

    let username, firstName, email, password

    const buttonStyle = {
      fontFamily: 'Avenir, sans-serif'
    }

    return (
      <div>
        <div id='form_holder'>

          <form 
            onSubmit= { 
              e => {
                e.preventDefault()
                this.props.handler(
                  username.value,
                  firstName.value,
                  email.value,
                  password.value
                )
              }
            }
          >

            <div className='field'>
              <label>Username</label>
              <input name='username'
                onChange={() => {
                  this.setState({
                    show: 0
                  })
                }}
                onBlur={() => {
                  this.setState({
                    show: -1
                  })
                }} 
                type='text'
                className=''
                ref={ node => {
                  username = node
                  this.username = node
                } }>
              </input>
              <small 
                className={ this.state.show == 0 ? 
                  'show' : 'hide' 
                }>
                Username should be at least 8 characters.</small>
            </div>

            <div className='field'>
              <label>First Name</label>
              <input name='firstName'
                type='text'
                className=''
                ref={ node => {
                  firstName = node
                } }>
              </input>
            </div>

            <div className='field'>
              <label>Email</label>
              <input name='email'
                onChange={() => {
                  this.setState({
                    show: 1
                  })
                }}
                onBlur={() => {
                  this.setState({
                    show: -1
                  })
                }} 
                type='email' 
                className=''
                ref={ node => {
                  email = node
                } }>
              </input>
              <small 
                className={ this.state.show == 1 ? 
                  'show' : 'hide' 
                }>
                Never will be displayed on the site.</small>
            </div>

            <div className='field'>
              <label>Password</label>
              <input name='password'
                onChange={() => {
                  this.setState({
                    show: 2
                  })
                }}
                onBlur={() => {
                  this.setState({
                    show: -1
                  })
                }}
                type='password'
                className=''
                ref={ node => {
                  password = node
                } }>
              </input>
              <small 
                className={ this.state.show == 2 ? 
                  'show' : 'hide' 
                }>
                Password should be at least 8 characters.</small>
            </div>

            <div className='field'>
              <Button
                hover={ this.state.hover } 
                hoverIn={ this.hoverIn }
                hoverOut={ this.hoverOut }
                styling={ buttonStyle }
                buttonType={'submit'}
              > 
                CREATE ACCOUNT
              </Button>

              <small id='switch_page'>
                Already have an account? <Link to='/login'>Login</Link>
              </small>

            </div>
          </form>

        </div>
      </div>
    )
  }

}

export default Register