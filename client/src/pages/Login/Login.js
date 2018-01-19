import React from 'react'
import './Login.css'
import Button from '../../components/Button'

const Login = props => {

  let username, password

  return (
    <div>
      <div>

        <form 
          onSubmit={
            e => {
              e.preventDefault()
              props.handler(
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
                } }
            ></input>
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
            <button type='submit'>
              Login
            </button>
          </div>

          {
            props.error ? <h2>{ props.error }</h2>
              : null
          }

        </form>

      </div>
    </div>
  )
}

export default Login