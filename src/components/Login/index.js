import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    checkbox: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({checkbox: !prevState.checkbox}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitform = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg, checkbox} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginBgContainer">
        <div className="loginContainer">
          <img
            className="logoImage"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <form className="formContainer" onSubmit={this.onSubmitform}>
            <div className="usernameContainer">
              <label htmlFor="usernameInput" className="label">
                USERNAME
              </label>
              <input
                id="usernameInput"
                type="text"
                placeholder="Username"
                className="input"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="usernameContainer">
              <label htmlFor="passwordInput" className="label">
                PASSWORD
              </label>
              <input
                id="passwordInput"
                type={checkbox ? 'text' : 'password'}
                placeholder="Password"
                className="input"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="checkboxContainer">
              <input
                type="checkbox"
                id="checkboxInput"
                className="checkboxInput"
                onClick={this.onClickCheckbox}
              />
              <label htmlFor="checkboxInput" className="checkboxLabel">
                Show Password
              </label>
            </div>
            <button type="submit" className="loginButton">
              Login
            </button>
            {showSubmitError && <p className="errorMsg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
