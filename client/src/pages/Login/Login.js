import React from 'react'
import './Login.css'

const Login = props => {
  <div>
    <div className=''>

      <form 
        onSubmit={
          e => {
            e.preventDefault()
            props.handler(
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
              } }>
          ></input>
        </div>

        <div className='field'>
          <label>Password</label>
          <input name='password' type='password' className='' ></input>
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
}

export default Login