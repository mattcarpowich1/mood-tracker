import React, { Component } from 'react'
import './Register.css'

class Register extends Component {

  componentDidMount() {
    this.username.focus()
  }

  render() {

    let username, email, password

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
                type='text'
                className=''
                ref={ node => {
                  username = node
                  this.username = node
                } }>
              </input>
            </div>

            <div className='field'>
              <label>Email</label>
              <input name='email' 
                type='email' 
                className=''
                ref={ node => {
                  email = node
                } }>
              </input>
            </div>

            <div className='field'>
              <label>Password</label>
              <input name='password'
                type='password'
                className=''
                ref={ node => {
                  password = node
                } }>
              </input>
            </div>

            <div className='field'>
              <button type='submit'
                className=''
              > 
                Submit
              </button>
            </div>
          </form>

        </div>
      </div>
    )
  }

}

export default Register