import React, { Component } from 'react'
import './Login.css'
import Button from '../../components/Button'

class Login extends Component {

  state = {
    hover: false
  }

  componentDidMount() {
    this.username.focus()
  }

  render() {

    let username, password

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
        <div>

          <form 
            onSubmit={
              e => {
                e.preventDefault()
                this.props.handler(
                  username.value,
                  password.value
                )
              }          
            }
          >
            <div className='field'>
              <label>Username</label>
              <input name='username' 
                type='text'
                ref={ node => {
                    username = node
                    this.username = node
                  } }
              >
              </input>
            </div>

            <div className='field'>
              <label>Password</label>
              <input name='password' 
                type='password' 
                ref={ node => {
                    password = node
                  } }
              ></input>
            </div>

            <div className='field'>
              <button onMouseEnter={() => {
                this.setState({
                  hover: true
                })
              }} 
                onMouseLeave={() => {
                  this.setState({
                    hover: false
                  })
                }}
                style={ buttonStyle }
                className={ this.state.hover ? 'hover' : '' }
                type='submit'>
                Login
              </button>
            </div>

            {
              this.props.error ? <h2>{ this.props.error }</h2>
                : null
            }

          </form>

        </div>
      </div>
    )
  }
}

export default Login