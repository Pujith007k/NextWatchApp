import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          className="navbarLogo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
      </Link>
      <div className="navIcons">
        <button
          type="button"
          aria-label="button"
          className="themeButton"
          data-testid="theme"
        >
          <FaMoon className="reactIcon" />
        </button>
        <img
          className="profileIcon"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
          alt="profile"
        />
        <Popup
          modal
          trigger={
            <button type="button" className="logoutButton">
              Logout
            </button>
          }
        >
          {close => (
            <>
              <div className="popUpContainer">
                <p className="popUpParagraph">
                  Are you sure, you want to logout?
                </p>
                <div className="buttonContainer">
                  <button
                    type="button"
                    className="cancelButton"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="confirmButton"
                    onClick={onClickLogout}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </>
          )}
        </Popup>
      </div>
    </nav>
  )
}

export default withRouter(Header)
