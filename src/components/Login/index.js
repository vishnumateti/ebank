import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {userId: '', pin: '', isLoginFailure: false, errorMsg: ''}

  enterUserID = event => {
    this.setState({userId: event.target.value})
  }

  enterPin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = error => {
    this.setState({isLoginFailure: true, errorMsg: error})
  }

  loginForm = async event => {
    event.preventDefault()

    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, isLoginFailure, errorMsg} = this.state

    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <form onSubmit={this.loginForm}>
            <h1>Welcome Back</h1>
            <label htmlFor="UserID">User ID</label>
            <input
              value={userId}
              id="UserID"
              type="text"
              placeholder="Enter User ID"
              onChange={this.enterUserID}
            />
            <label htmlFor="PIN">PIN</label>
            <input
              value={pin}
              id="PIN"
              type="password"
              placeholder="Enter User ID"
              onChange={this.enterPin}
            />
            <button type="submit">Login</button>
            {isLoginFailure && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
