import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import './Login.css'

class Login extends Component {

  state = {
    hover: false
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

    let username, password

    const buttonStyle = {
      fontFamily: 'Avenir, sans-serif'
    }

    return (
      <div>
        <div id='form_holder'>

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

              <Button
                hover={ this.state.hover } 
                hoverIn={ this.hoverIn }
                hoverOut={ this.hoverOut }
                styling={ buttonStyle }
                buttonType={'submit'}
              > 
                LOGIN
              </Button>

              <small id='switch_page'>
                Don't have an account? <Link to='/'>Sign Up</Link>
              </small>

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