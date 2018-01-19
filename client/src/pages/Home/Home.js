import React, { Component } from 'react'

class Home extends Component {

  // ComponentWillMount() {
    
  // }



  render() {

    const { user } = this.props

    return (
      <div className='main'>
        <h1 style={{ textAlign: 'center' }}>
          { `Logged in as ID: ${ user }` }
        </h1>
      </div>
    )

  }
}

export default Home