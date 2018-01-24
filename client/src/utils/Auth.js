import axios from 'axios'
import jwt from 'jsonwebtoken'

const findToken = _this => {
  const token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    _this.setState({
      loggedIn: true,
      userId: token.aud
    })
  } 
}

const registerUser = (username, firstName, email, password) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      FirstName: firstName,
      Email: email,
      PasswordHash: password
    }
    axios.post('/user/add', userData)
    .then(res => {
      resolve(res.data.ID)
    })
    .catch(err => {
      const { data } = err.response
      reject(data)
    })
  })
}

const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const userData = {
      username,
      PasswordHash: password
    }
    axios.post('/user/login', userData)
    .then(res => {
      let token = jwt.verify(res.data, 'this-is-a-secret');
      if (token) { 
        localStorage.setItem('token', JSON.stringify(token))
        resolve(token.aud)
      } else {
        reject('Could not verify user.')
      } 
    })
    .catch(err => {
      reject(err)
    })
  })
}

const logoutUser = _this => {
  localStorage.setItem("token", null)
  _this.setState({
    loggedIn: false,
    userId: null
  })
}

export default { 
  findToken, 
  registerUser,
  loginUser,
  logoutUser
}