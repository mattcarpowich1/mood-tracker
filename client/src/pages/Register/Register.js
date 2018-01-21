import React, { Component } from 'react'
import Button from '../../components/Button'
import './Register.css'

class Register extends Component {

  state = {
    start: false,
    hover: false,
    show: -1
  }

  componentDidMount() {
    this.username.focus()
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

  render() {

    let username, email, password

    const buttonStyle = {
      fontFamily: 'inherit',
      fontSize: '16px',
      width: '192px',
      padding: '8px 0px',
      border: '1px solid #999',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      color: '#999'
    }

    return (
      <div>
        <div className=''>

          <form 
            onSubmit= { 
              e => {
                e.preventDefault()
                this.props.handler(
                  username.value,
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
                Never shown on the site - must use real email address.</small>
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
                Create Account
              </Button>

            </div>
          </form>

        </div>
      </div>
    )
  }

}

export default Register