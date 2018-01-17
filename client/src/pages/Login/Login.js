import React from 'react'
import './Login.css'

const Login = props => {
  <div>
    <div className=''>

      <form 
        onSubmit={ 
          (({ u, p }) =>
            props.handler(u, p)
          ) 
        }
      >
        <div className='field'>
          <label>Username</label>
          <input name='username' type='text' className='' ></input>
        </div>

        <div className='field'>
          <label>Password</label>
          <input name='password' type='password' className='' ></input>
        </div>

      </form>

    </div>
  </div>
}

export default Login